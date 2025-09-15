import path from "path";
import config from "../config/env-config.js";
import {
  BEST_SELLING_PLANTS_LIMIT,
  BEST_SELLING_TAG,
  CATEGORY_ARR,
  PLANTS_PER_PAGE,
  SIMILAR_PLANTS_COUNT,
  STATUS,
} from "../lib/constants.js";
import { buildPlantFilter, emailRegEx, phoneRegEx } from "../lib/util.js";
import { ContactUs } from "../models/ContactUs.js";
import Home from "../models/Home.js";
import { OrderEnquiry } from "../models/OrderEnquiry.js";
import Plant from "../models/Plant.js";
import Settings from "../models/Settings.js";
import Subscription from "../models/Subscription.js";
import Testimonial from "../models/Testimonial.js";
import sendEmail from "../services/sendEmail.js";

export const getCatProducts = async (req, res, next) => {
  try {
    const { category_slug } = req.params;
    const { page } = req.query;

    if (!category_slug) {
      return next({
        message: "Category slug is required",
        status: 400,
      });
    }

    const validCategory = CATEGORY_ARR.find(
      (cat) => cat.value === category_slug
    );
    if (!validCategory) {
      return next({
        message: "Invalid category provided",
        status: 400,
      });
    }

    const skip = page && page > 0 ? (page - 1) * PLANTS_PER_PAGE : 0;
    const filter = await buildPlantFilter(req.query);

    const plantsTotal = await Plant.countDocuments({
      ...filter,
      status: STATUS.ACTIVE,
      category: category_slug,
    });

    const plants = await Plant.find({
      ...filter,
      status: STATUS.ACTIVE,
      category: category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .skip(skip)
      .limit(PLANTS_PER_PAGE)
      .lean()
      .exec();

    req.successResponse = {
      message: "Data retrieved successfully.",
      data: {
        plants: plants,
        total: plantsTotal,
      },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching plants.",
      status: 500,
    });
  }
};

export const getMasterData = async (req, res, next) => {
  try {
    const masterData = await Settings.findOne();

    const updatedData = masterData
      ? {
          tags: masterData.tags || [],
        }
      : {
          tags: [],
        };

    req.successResponse = {
      message: "MasterData retrieved successfully",
      data: updatedData,
    };

    return next();
  } catch (e) {
    return next({
      message: e.message || " An error occurred while fetching Master Data",
      status: 500,
    });
  }
};

export const getPlantDetailsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return next({
        message: "Plant slug is required",
        status: 400,
      });
    }

    const plant = await Plant.findOne({
      slug,
      status: STATUS.ACTIVE,
    })
      .select("-__v -updatedAt -createdAt")
      .lean();

    if (!plant) {
      return next({
        message: "Plant not found",
        status: 404,
      });
    }

    const similarPlants = await Plant.aggregate([
      {
        $match: {
          category: plant.category,
          slug: { $ne: slug },
          status: STATUS.ACTIVE,
        },
      },
      { $sample: { size: SIMILAR_PLANTS_COUNT } },
    ]);

    req.successResponse = {
      message: "Plant details retrieved successfully.",
      data: {
        plant,
        similarPlants,
      },
    };

    return next();
  } catch (error) {
    return next({
      message:
        error.message || "An error occurred while fetching plant details.",
      status: 500,
    });
  }
};

export const getPlantDetailsByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        message: "Plant ID is required",
        status: 400,
      });
    }

    const plant = await Plant.findOne({
      _id: id,
      status: STATUS.ACTIVE,
    })
      .select("-__v -updatedAt -createdAt")
      .lean();

    if (!plant) {
      return next({
        message: "Plant not found",
        status: 404,
      });
    }

    const similarPlants = await Plant.aggregate([
      {
        $match: {
          category: plant.category,
          _id: { $ne: id },
          status: STATUS.ACTIVE,
        },
      },
      { $sample: { size: SIMILAR_PLANTS_COUNT } },
    ]);

    req.successResponse = {
      message: "Plant details retrieved successfully.",
      data: {
        plant,
        similarPlants,
      },
    };
    return next();
  } catch (error) {
    return next({
      message:
        error.message || "An error occurred while fetching plant details.",
      status: 500,
    });
  }
};

export const createOrderEnquiry = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      message,
      preferredContactTime,
      plantId,
      userId,
    } = req.body;

    if (!name || !email || !phone || !message || !plantId) {
      return next({ status: 400, message: "Missing required fields." });
    }

    if (name.trim().length < 2)
      return next({
        status: 400,
        message: "Name must be at least 2 characters.",
      });
    if (!emailRegEx.test(email))
      return next({ status: 400, message: "Invalid email address." });
    if (!phoneRegEx.test(phone))
      return next({ status: 400, message: "Invalid phone number." });
    if (message.trim().length < 10)
      return next({
        status: 400,
        message: "Message must be at least 10 characters long.",
      });

    const enquiry = new OrderEnquiry({
      name,
      email,
      phone,
      message,
      preferredContactTime: preferredContactTime || "",
      plantId: plantId,
      userId: userId || null,
    });

    const savedEnquiry = await enquiry.save();

    const adminTemplatePath = path.join(
      process.cwd(),
      "templates",
      "enquiry-admin.html"
    );

    const AdminReplacements = {
      name,
      email,
      phone,
      message,
      supportEmail: config.SUPPORT_EMAIL,
      urlLink: `${config.FRONTEND_HOME}/admin/`,
    };

    const data = await sendEmail({
      templatePath: adminTemplatePath,
      // receiverEmail: "bokarevaibhav2001@gmail.com",
      receiverEmail: config.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      replacements: AdminReplacements,
    });

    const usertemplatePath = path.join(
      process.cwd(),
      "templates",
      "enquiry-user.html"
    );

    const userReplacements = {
      name,
      message,
      phone: config.CONTACT_NUMBER,
      email: config.ADMIN_EMAIL,
      supportEmail: config.SUPPORT_EMAIL,
    };

    const resData = await sendEmail({
      templatePath: usertemplatePath,
      receiverEmail: email,
      subject: "Thank You for Your Enquiry | Sanas Nursery",
      replacements: userReplacements,
    });

    // not handling email error, because email is not importtant here

    req.successResponse = {
      message: "Enquiry submitted successfully.",
      data: savedEnquiry,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while creating Enquiry.",
    });
  }
};

export const createContactEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return next({ status: 400, message: "Missing required fields." });
    }

    if (name.trim().length < 2)
      return next({
        status: 400,
        message: "Name must be at least 2 characters.",
      });
    if (!emailRegEx.test(email))
      return next({ status: 400, message: "Invalid email address." });
    if (!phoneRegEx.test(phone))
      return next({ status: 400, message: "Invalid phone number." });
    if (message.trim().length < 10)
      return next({
        status: 400,
        message: "Message must be at least 10 characters long.",
      });

    const contactEnquiry = new ContactUs({
      name,
      email,
      phone,
      message,
    });

    const savedEnquiry = await contactEnquiry.save();

    const adminTemplatePath = path.join(
      process.cwd(),
      "templates",
      "enquiry-admin.html"
    );

    const AdminReplacements = {
      name,
      email,
      phone,
      message,
      supportEmail: config.SUPPORT_EMAIL,
      urlLink: `${config.FRONTEND_HOME}/admin/`,
    };

    const data = await sendEmail({
      templatePath: adminTemplatePath,
      // receiverEmail: "bokarevaibhav2001@gmail.com",
      receiverEmail: config.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      replacements: AdminReplacements,
    });

    const usertemplatePath = path.join(
      process.cwd(),
      "templates",
      "enquiry-user.html"
    );

    const userReplacements = {
      name,
      message,
      phone: config.CONTACT_NUMBER,
      email: config.ADMIN_EMAIL,
      supportEmail: config.SUPPORT_EMAIL,
    };

    const resData = await sendEmail({
      templatePath: usertemplatePath,
      receiverEmail: email,
      subject: "Thank You for Your Enquiry | Sanas Nursery",
      replacements: userReplacements,
    });

    // not handling email error, because email is not importtant here

    req.successResponse = {
      message: "Contact Enquiry submitted successfully.",
      data: savedEnquiry,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message:
        error.message ||
        "Internal server error while creating contact enquiry.",
    });
  }
};

export const subscribeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next({ message: "Email is required", status: 400 });
    }

    if (!emailRegEx.test(email)) {
      return next({ message: "Invalid Email Format", status: 400 });
    }
    const checkforexistingUser = await Subscription.findOne({ email });
    if (checkforexistingUser) {
      return next({ message: "Email is already subscribed", status: 400 });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    req.successResponse = {
      message: "Subscription successful!",
      data: newSubscription,
    };
    return next();
  } catch (error) {
    return next({ message: "Internal Server Error", status: 500 });
  }
};

export const getPublicHomeData = async (req, res, next) => {
  try {
    const homeData = await Home.findOne({})
      .populate({
        path: "greenChoices",
        select: "_id title plantId slug category pictures",
        match: { status: STATUS.ACTIVE },
      })
      .lean();

    const testimonials = await Testimonial.find({ status: STATUS.ACTIVE })
      .select("_id author content rating link")
      .sort({ createdAt: -1 })
      .lean();

    const bestSellingPlants = await Plant.find({
      status: STATUS.ACTIVE,
      "tags.value": BEST_SELLING_TAG,
    })
      .select("_id title plantId category pictures")
      .limit(BEST_SELLING_PLANTS_LIMIT)
      .sort({ createdAt: -1 })
      .lean();

    if (!homeData) {
      const defaultHomeData = {
        greenChoices: [],
        cards: {},
        gallery: {},
        videos: [],
        testimonials: testimonials || [],
        bestSellingPlants: bestSellingPlants || [],
      };

      req.successResponse = {
        message: "Home data retrieved successfully",
        data: defaultHomeData,
      };
      return next();
    }

    const filteredGreenChoices =
      homeData.greenChoices?.filter((plant) => plant !== null) || [];

    const responseData = {
      greenChoices: filteredGreenChoices,
      cards: homeData.cards || {},
      gallery: homeData.gallery || {},
      videos: homeData.videos || [],
      testimonials: testimonials || [],
      bestSellingPlants: bestSellingPlants || [],
    };

    req.successResponse = {
      message: "Home data retrieved successfully",
      data: responseData,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: "Internal server error while fetching home data.",
    });
  }
};

const searchOptionsByField = (field, products) => {
  return products.map((product) => {
    if (!product[field]) return;
    return {
      label: product[field],
      url: `/categories/${product.category}/${product.slug}/${product._id}`,
    };
  });
};

export const getGlobalSearchOpt = async (req, res, next) => {
  try {
    const products = await Plant.find({ status: STATUS.ACTIVE })
      .select("title category slug _id")
      .lean();

    const optionsByProductTitle = searchOptionsByField("title", products);

    req.successResponse = {
      message: "Search list fetched successfully!",
      data: optionsByProductTitle,
    };

    return next();
  } catch (error) {
    return next({ message: "Internal Server Error", status: 500 });
  }
};
