const COUNTRY_NAME = "India";
export const PASSWORD_HASH_ROUND = 10;
export const SIMILAR_PLANTS_COUNT = 10;

export const ROLES = {
  USER: "User",
  ADMIN: "Admin",
};

export const STATUS = {
  ACTIVE: "0",
  INACTIVE: "1",
  DELETED: "2",
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

export const MASTER_DATA_TYPE = {
  TAGS: "tags",
};

export const MEDIA = {
  // Gallery: {
  //   destination: "public/pictures/gallery",
  //   resizeOptions: {
  //     width: 501,
  //     height: 668,
  //     fit: "cover",
  //   },
  //   pictures: { count: 10, fileSize: 0.5 * 1024 * 1024 },
  //   limits: { fileSize: 0.5 * 1024 * 1024 },
  // },
  Plants: {
    destination: "public/pictures/Plants",
    resizeOptions: {
      width: 501,
      height: 668,
      fit: "cover",
    },
    pictures: { count: 20, fileSize: 0.5 * 1024 * 1024 },
    limits: { fileSize: 0.5 * 1024 * 1024 },
  },
  Home: {
    Cards: {
      destination: "public/pictures/home",
      resizeOptions: {
        fit: "cover",
      },
      pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
      limits: { fileSize: 0.5 * 1024 * 1024 },
    },
    Gallery: {
      destination: "public/pictures/home",
      resizeOptions: {
        fit: "cover",
      },
      pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
      limits: { fileSize: 0.5 * 1024 * 1024 },
    },
    // Top: {
    //   A1: {
    //     destination: "public/pictures/home",
    //     resizeOptions: {
    //       // width: 505,
    //       // height: 457,
    //       fit: "cover",
    //     },
    //     pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
    //     limits: { fileSize: 0.5 * 1024 * 1024 },
    //   },
    //   B1: {
    //     destination: "public/pictures/home",
    //     resizeOptions: {
    //       width: 505,
    //       height: 214,
    //       fit: "cover",
    //     },
    //     pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
    //     limits: { fileSize: 0.5 * 1024 * 1024 },
    //   },
    //   B2: {
    //     destination: "public/pictures/home",
    //     resizeOptions: {
    //       width: 242,
    //       height: 214,
    //       fit: "cover",
    //     },
    //     pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
    //     limits: { fileSize: 0.5 * 1024 * 1024 },
    //   },
    // },
    // Cards: {
    //   destination: "public/pictures/home",
    //   resizeOptions: {
    //     width: 1899,
    //     height: 584,
    //     fit: "cover",
    //   },
    //   pictures: { count: 1, fileSize: 0.5 * 1024 * 1024 },
    //   limits: { fileSize: 0.5 * 1024 * 1024 },
    // },
  },
  // ContactUs: {
  //   destination: "public/pictures/contact-us",
  //   resizeOptions: {
  //     fit: "cover",
  //   },
  //   pictures: { count: 10, fileSize: 0.5 * 1024 * 1024 },
  //   files: { count: 1, fileSize: 0.5 * 1024 * 1024 },
  //   limits: { fileSize: 0.5 * 1024 * 1024 },
  // },
};

export const PLANTS_PER_PAGE = 20;
export const GREEN_CHOICES_PRODUCT_LIMIT = 12;

export const HOME_SECTIONS = {
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

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

export const SORT = {
  BEST_SELLER: "best-seller",
  TOP_RATED: "customer-ratings",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
};

// const PRICE_FILTER_OPT = [500, 1000, 1500, 2000, 3000, 4000, 5000];

export const ORDER_TAB_TYPE = {
  COMPLETED: "completed",
  INCOMPLETED: "incompleted",
};

export const TOP_SELLING_PRODUCT_COUNT = 10;
export const YT_VIDEOS_LENGTH = 2;

export const ENQUIRY_STATUS = {
  PENDING: "pending",
  CONTACTED: "contacted",
  RESOLVED: "resolved",
  CLOSED: "closed",
};
