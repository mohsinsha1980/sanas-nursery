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

export const CATEGORIES = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
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

export const HOME_FIELDS = {
  TOP: {
    A1: "A1",
    B1: "B1",
    B2: "B2",
    B3: "B3",
    C1: "C1",
  },
  MIDDLE: {
    D1: "D1",
  },
  BOTTOM: {
    E1: "E1",
    F1: "F1",
  },
};

export const defultHomeData = {
  A1: {
    picture: "/site/placeholder/1.jpg",
    small: "Hot Deals",
    big: "Women's Collection",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  B1: {
    picture: "/site/placeholder/2.1.jpg",
    small: "Smart Deals",
    big: "Men's Collection",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  B2: {
    picture: "/site/placeholder/2.2.jpg",
    small: "Live Deals",
    big: "Accessories",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  B3: {
    picture: "/site/placeholder/2.3.jpg",
    small: "Offers",
    big: "New Year Offer",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  C1: {
    picture: "/site/placeholder/3.jpg",
    small: "Desi Deals",
    big: "Ethnic Special",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  D1: {
    picture: "/site/placeholder/middle-section.jpg",
    small: "Deal Of The Week",
    big: "Winter Collection",
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  E1: {
    picture: "/site/placeholder/bottom-section-1.jpg",
    small: `Starting At ₹ 475/-`,
    big: `Women's T-shirt`,
    linkLabel: "Shop Now",
    linkAddress: "#",
  },
  F1: {
    picture: "/site/placeholder/bottom-section-2.jpg",
    small: `Starting At ₹ 575/-`,
    big: `Men's Casual Shirt`,
    linkLabel: "Shop Now",
    linkAddress: "#",
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
