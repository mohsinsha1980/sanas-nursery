export const PLANTS_PER_PAGE = 12;
export const BLOGS_PER_PAGE = 20;
export const PRICE_RANGE_MAX = 15000;
export const ALLOWED_MAX_FILE_SIZE = 300000;
export const DEFAULT_PER_PAGE = 10;
export const MAX_ADDRESS_COUNT = 4;
export const USER_STORE_DATA_KEY = "vb9n5ysag59vp";
export const PRODUCT_DETAILS_REVIEW_COUNT = 6;
export const DISPLAY_LIMIT = 6;
export const YT_VIDEOS_LENGTH = 2;
export const LOGO =
  process.env.NEXT_PUBLIC_BASE_PATH + "/site/images/logo-full.svg"; // change here take from config

export const SIZES = [
  { label: "Extra Small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
];

export const DISCOUNT = [
  { label: "0%-20%", value: "0-20" },
  { label: "20%-40%", value: "20-40" },
  { label: "40%-60%", value: "40-60" },
  { label: "60%-80%", value: "60-80" },
];

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const ACTION_TYPES = {
  EDIT: "Edit",
  DELETE: "Delete",
  VIEW: "View",
};

export const PAGINATION = {
  PER_PAGE: 5,
};

export const BLOG_CATEGORIES = {
  PLANT_CARE: { label: "Plant Care", value: "plant-care" },
  GARDENING_TIPS: { label: "Gardening Tips", value: "gardening-tips" },
  PLANT_SPECIES: { label: "Plant Species", value: "plant-species" },
  SEASONAL_GUIDES: { label: "Seasonal Guides", value: "seasonal-guides" },
  NURSERY_NEWS: { label: "Nursery News", value: "nursery-news" },
  SUSTAINABLE_LIVING: {
    label: "Sustainable Living",
    value: "sustainable-living",
  },
  INDOOR_PLANTS: { label: "Indoor Plants", value: "indoor-plants" },
  OUTDOOR_GARDENING: { label: "Outdoor Gardening", value: "outdoor-gardening" },
  PLANT_DISEASES: { label: "Plant Diseases", value: "plant-diseases" },
  FERTILIZERS: { label: "Fertilizers & Soil", value: "fertilizers-soil" },
};

export const ROLES = {
  USER: "User",
  ADMIN: "Admin",
};

export const HOME_SECTIONS = {
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

export const CATEGORIES = {
  FRUIT_TREES: {
    label: "Fruit Trees",
    value: "fruit-trees",
    description: "Buy healthy fruit trees online.",
    picture: "/plant1.png",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
  FLOWER_TREES: {
    label: "Flower Trees",
    value: "flower-trees",
    picture: "/plant2.png",
    description: "Beautiful flowering trees for your garden.",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
  SHADOW_TREES: {
    label: "Shadow Trees",
    value: "shadow-trees",
    picture: "/plant3.png",
    description: "Tall shadow trees for shade and greenery.",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
  SHOW_TREES: {
    label: "Show Trees",
    value: "show-trees",
    picture: "/plant1.png",
    description: "Decorative trees to enhance your landscape.",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
  MASALA: {
    label: "Masala",
    value: "masala",
    picture: "/plant2.png",
    description: "Spice plants and masala herbs for home garden.",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
  OTHERS: {
    label: "Others",
    value: "others",
    picture: "/plant3.png",
    description: "Other plant varieties available in our collection.",
    seoTitle: "Fruit Trees",
    seoDescription: "Buy healthy fruit trees online.",
  },
};

export const CATEGORY_ARR = Object.values(CATEGORIES).map(
  (category) => category
);

export const PLANT_SIZES = {
  SMALL: { label: "Small", value: "small" },
  MEDIUM: { label: "Medium", value: "medium" },
  LARGE: { label: "Large", value: "large" },
};

export const PLANT_SIZES_ARR = Object.values(PLANT_SIZES).map((size) => size);

export const CARE_LEVEL = {
  EASY: { label: "Easy", value: "easy" },
  MODERSTE: { label: "Moderate", value: "moderate" },
  HIGH: { label: "High", value: "high" },
};

export const CARE_LEVEL_ARR = Object.values(CARE_LEVEL).map((level) => level);

export const HOME_FIELDS = {
  GREEN_CHOICES: "greenChoices",
  CARDS: {
    C1: "C1",
    C2: "C2",
  },
  GALLERY: {
    G1: "G1",
    G2: "G2",
    G3: "G3",
  },
  VIDEOS: {
    V1: "V1",
    V2: "V2",
  },
};

export const USER_ROUTES = [
  "/user/addresses",
  "/user/checkout/cart",
  "/user/checkout/addresses",
  "/user/checkout/payment",
  "/user/orders",
  "/user/profile",
  "/user/wishlist",
];

export const ADMIN_ROUTES = [
  "/admin/categories",
  "/admin/categories/add",
  "/admin/categories/edit",
  "/admin/contact-us",
  "/admin/coupons",
  "/admin/coupons/add",
  "/admin/coupons/edit",
  "/admin/transactions",
  "/admin/dashboard",
  "/admin/gallery",
  "/admin/home",
  "/admin/orders",
  "/admin/orders/detail",
  "/admin/products",
  "/admin/products/add",
  "/admin/products/edit",
  "/admin/products/view",
  "/admin/reviews",
  "/admin/settings",
  "/admin/subscription",
  "/admin/support",
  "/admin/transactions",
  "/admin/users",
  "/admin/blogs",
  "/admin/blogs/add",
  "/admin/blogs/edit",
  "/admin/order-enquiries",
  "/admin/contact-enquiries",
];

export const MASTER_DATA_TYPE = {
  TAGS: "tags",
  BLOG_TAGS: "blogTags",
} as const;

export const defultHomeData = {
  Cards: {
    C1: {
      picture: "/site/home/collection/collecton-banner1.webp",
      small: "Fresh, lush plants perfect for the summer season.",
      smallColor: "black",
      large: "Summer Special Green",
      largeColor: "white",
      link: {
        label: "View Collection",
        address: "#",
        color: "black",
      },
    },

    C2: {
      picture: "/site/home/collection/collection-banner2.webp",
      small: "Fresh, lush plants perfect for the rainy season.",
      smallColor: "black",
      large: "Monsoon Special Green",
      largeColor: "black",
      link: {
        label: "View Collection",
        address: "#",
        color: "orange",
      },
    },
  },
  Gallery: {
    G1: "/site/home/gallery/gallery1.webp",
    G2: "/site/home/gallery/gallery2.webp",
    G3: "/site/home/gallery/gallery3.webp",
  },
  Videos: [
    "https://www.youtube.com/watch?v=WNe8EDa8WPY",
    "https://www.youtube.com/watch?v=9wY_-ZMQ-jQ",
  ],
};

export const SITE_DATA = {
  EMAIL: "sanasnursery@gmail.com",
  phone: "+91 8999481616",
  LOCATION: `Sanas Wholesale Nursery, Bori Fata, near ITI collage, Uruli Kanchan, Maharashtra, 412201`,
  SOCIAL: {
    facebook: "https://www.facebook.com/share/1GmrYmkSHp/?mibextid=wwXIfr",
    insta:
      "https://www.instagram.com/wholesalenursery?igsh=MXZ5MnFlMzVvM2Vsaw%3D%3D&utm_source=qr",
    youtube: "https://youtube.com/@sanasnursery?si=g2njg_7Z2kfy6fw7",
  },
} as const;

export const FOOTER_LINKS = {
  COMPANY: [
    {
      label: " Contact Us",
      pageUrl: "/contact-us",
    },
    {
      label: "Privacy Policy",
      pageUrl: "/privacy-policy",
    },
    {
      label: " Terms & Conditions",
      pageUrl: "/terms-conditions",
    },
  ],
  INFORMATION: [
    {
      label: "Home",
      pageUrl: "/",
    },
    {
      label: " About Us",
      pageUrl: "/about-us",
    },
    {
      label: "Blogs",
      pageUrl: "/blogs",
    },
  ],
} as const;

export const ENQUIRY_STATUS = {
  PENDING: "pending",
  CONTACTED: "contacted",
  RESOLVED: "resolved",
  CLOSED: "closed",
};

export type EnquiryStatusType =
  (typeof ENQUIRY_STATUS)[keyof typeof ENQUIRY_STATUS];
