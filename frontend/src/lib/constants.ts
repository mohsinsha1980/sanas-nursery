export const PRODUCTS_PER_PAGE = 20;
export const PRICE_RANGE_MAX = 15000;
export const ALLOWED_MAX_FILE_SIZE = 300000;
export const DEFAULT_PER_PAGE = 10;
export const MAX_ADDRESS_COUNT = 4;
export const USER_STORE_DATA_KEY = "vb9n5ysag59vp";
export const PRODUCT_DETAILS_REVIEW_COUNT = 6;
export const DISPLAY_LIMIT = 6;
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

// export const PRODUCT_SORT_OPTIONS: VariantType[] = [
//   {
//     label: "Price: Low to High",
//     value: "price-asc",
//   },
//   {
//     label: "Price: High to Low",
//     value: "price-desc",
//   },
//   {
//     label: "Customer Ratings",
//     value: "customer-ratings",
//   },
//   {
//     label: "Best Seller",
//     value: "best-seller",
//   },
// ];

export const ACTION_TYPES = {
  EDIT: "Edit",
  DELETE: "Delete",
  VIEW: "View",
};

export const PAGINATION = {
  PER_PAGE: 5,
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
  FRUIT_TREES: { label: "Fruit Trees", value: "fruit-trees" },
  FLOWER_TREES: { label: "Flower Trees", value: "flower-trees" },
  SHADOW_TREES: { label: "Shadow Trees", value: "shadow-trees" },
  SHOW_TREES: { label: "Show Trees", value: "show-trees" },
  MASALA: { label: "Masala", value: "masala" },
  OTHERS: { label: "Others", value: "others" },
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
];

export const MASTER_DATA_TYPE = {
  TAGS: "tags",
} as const;

export const defultHomeCardsData = {
  C1: {
    picture: "/placeholder/1.png",
    small: "Hot Deals",
    big: "Women's Collection",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  C2: {
    picture: "/placeholder/2.png",
    small: "Hot Deals",
    big: "Women's Collection",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
};
