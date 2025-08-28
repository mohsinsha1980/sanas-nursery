import MasterData from "../../models/Settings.js";

export const getMasterData = async (req, res, next) => {
  try {
    const masterData = await MasterData.findOne();

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

// const addMasterData = async (req, res, next) => {
//   try {
//     const { field, data } = req.body;

//     if (!field || !data) {
//       return next({ status: 400, message: "Field and data are required." });
//     }

//     const validFields = Object.values(MASTER_DATA_TYPE);
//     if (!validFields.includes(field)) {
//       return next({ status: 400, message: "Invalid field provided." });
//     }

//     let masterData = await MasterData.findOne();

//     if (!masterData) {
//       const newMasterData = new MasterData({ [field]: data });
//       await newMasterData.save();
//       req.successResponse = {
//         message: "MasterData created.",
//         data: newMasterData,
//       };
//       return next();
//     }

//     let newData = null;

//     if (Array.isArray(masterData[field])) {
//       const isDuplicate = masterData[field].some((item) => {
//         const isLabelDuplicate = item.label === data.label;
//         const isValueDuplicate =
//           field !== "taxCharges" && item.value === data.value;
//         return isLabelDuplicate || isValueDuplicate;
//       });

//       if (isDuplicate) {
//         return next({
//           status: 400,
//           message: "Duplicate entry. The label or value already exists.",
//         });
//       }
//       masterData[field] = [...masterData[field], data];
//     }

//     const master = await masterData.save();
//     newData = master[field].find((field) => field.label === data.label);

//     req.successResponse = {
//       message: "MasterData updated.",
//       data: newData,
//     };
//     return next();
//   } catch (error) {
//     return next({
//       status: 500,
//       message: error.message || "Internal server error.",
//     });
//   }
// };

// const deleteMasterRecord = async (req, res, next) => {
//   try {
//     const { field, id } = req.params;

//     if (!field || !id) {
//       return next({ status: 400, message: "Field name and id are required." });
//     }

//     const validFields = Object.values(MASTER_DATA_TYPE);
//     if (!validFields.includes(field)) {
//       return next({ status: 400, message: "Invalid field provided." });
//     }

//     let masterData = await MasterData.findOne();
//     const recordIndex =
//       masterData && Array.isArray(masterData[field])
//         ? masterData[field].findIndex((record) => record._id.toString() === id)
//         : null;

//     if (!masterData || !masterData[field] || recordIndex === -1) {
//       return next({
//         status: 400,
//         message: "Data not found.",
//       });
//     }

//     const deletedRecord = masterData[field][recordIndex];
//     masterData[field].splice(recordIndex, 1);
//     await masterData.save();

//     req.successResponse = {
//       message: "Record deleted successfully.",
//       data: deletedRecord,
//     };
//     return next();
//   } catch (error) {
//     return next({
//       status: 500,
//       message: error.message || "Internal server error.",
//     });
//   }
// };

// const addAdminAddress = async (req, res, next) => {
//   try {
//     const { addressType } = req.body;

//     if (!addressType) {
//       return next({
//         message: "Missing address type",
//         status: 400,
//       });
//     }

//     let masterData = await MasterData.findOne();
//     if (!masterData) {
//       masterData = new MasterData();
//     }

//     if (addressType === "shippingAddress") {
//       const {
//         _id,
//         pickup_location,
//         name,
//         phone,
//         email,
//         address,
//         address_2,
//         city,
//         state,
//         country,
//         pin_code,
//       } = req.body;

//       if (
//         !_id ||
//         !pickup_location ||
//         !phone ||
//         !name ||
//         !email ||
//         !address ||
//         !city ||
//         !state ||
//         !pin_code ||
//         !country
//       ) {
//         return next({
//           message: "Missing required fields",
//           status: 400,
//         });
//       }

//       masterData.shippingAddress = {
//         pickup_location,
//         name,
//         email,
//         phone,
//         address,
//         address_2,
//         city,
//         state,
//         country,
//         pin_code,
//       };

//       await masterData.save();

//       req.successResponse = {
//         message: "Shipping address added successfully!",
//         data: masterData.shippingAddress,
//       };

//       return next();
//     }

//     if (addressType === "billingAddress") {
//       const { _id, fullName, phone, address1, address2, city, state, zip } =
//         req.body;

//       if (!_id || !fullName || !phone || !address1 || !city || !state || !zip) {
//         return next({
//           message: "Missing required fields",
//           status: 400,
//         });
//       }

//       masterData.billingAddress = {
//         fullName,
//         phone,
//         address1,
//         address2,
//         city,
//         state,
//         zip,
//       };

//       await masterData.save();

//       req.successResponse = {
//         message: "Billing address added successfully!",
//         data: masterData.billingAddress,
//       };

//       return next();
//     }
//   } catch (e) {
//     return next({
//       message: "Internal Server Error while adding address.",
//       status: 500,
//     });
//   }
// };

// const updateAdminAddress = async (req, res, next) => {
//   try {
//     const { _id, fullName, phone, address1, address2, city, state, zip } =
//       req.body;

//     if (!_id || !fullName || !phone || !address1 || !city || !state || !zip) {
//       return next({
//         message: "Missing required fields",
//         status: 400,
//       });
//     }

//     const masterData = await MasterData.findOne();

//     if (!masterData) {
//       return next({
//         message: "Master data not found",
//         status: 404,
//       });
//     }
//     if (!masterData.shippingAddress) {
//       masterData.shippingAddress = { _id };
//     }

//     masterData.shippingAddress.fullName = fullName;
//     masterData.shippingAddress.phone = phone;
//     masterData.shippingAddress.address1 = address1;
//     masterData.shippingAddress.address2 = address2;
//     masterData.shippingAddress.city = city;
//     masterData.shippingAddress.state = state;
//     masterData.shippingAddress.zip = zip;

//     await masterData.save();

//     req.successResponse = {
//       message: "Address added successfully!",
//       data: masterData.shippingAddress,
//     };

//     return next();
//   } catch (e) {
//     return next({
//       message: "Internal Server Error while adding address.",
//       status: 500,
//     });
//   }
// };
