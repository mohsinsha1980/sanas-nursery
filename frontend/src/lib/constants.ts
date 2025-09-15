import { CARDS, CATEGORIES_IMG, HERO, HOME_GALLERY, SITE } from "@/assets";

export const PLANTS_PER_PAGE = 20;
export const BLOGS_PER_PAGE = 20;
export const ALLOWED_MAX_FILE_SIZE = 300000;
export const DEFAULT_PER_PAGE = 20;
export const USER_STORE_DATA_KEY = "vb9n5ysag59vp";
export const YT_VIDEOS_LENGTH = 2;
export const BEST_SELLING_PLANTS_LIMIT = 10;
export const LOGO = SITE.LOGO;

export const MASTERDATA_PER_PAGE = 5;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const ROLES = {
  USER: "User",
  ADMIN: "Admin",
};

export const ACTION_TYPES = {
  EDIT: "Edit",
  DELETE: "Delete",
  VIEW: "View",
};

export const PAGINATION = {
  PER_PAGE: 20,
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

export const CATEGORIES = {
  FRUIT_TREES: {
    label: "Fruit Trees",
    value: "fruit-trees",
    title: "Trusted Fruit Tree Nursery for Every Garden and Farm.",
    picture: CATEGORIES_IMG.FRUIT_TREES,
    description:
      "Supplying strong, healthy fruit trees grown with care to bring freshness, shade and harvests.",
    seoTitle: "Trusted Fruit Tree Nursery for Every Garden and Farm.",
    seoDescription:
      "Supplying strong, healthy fruit trees grown with care to bring freshness, shade, and harvests.",
    heroImage: HERO.FRUIT_TREES,
  },
  FLOWER_TREES: {
    label: "Flower Trees",
    value: "flower-trees",
    title:
      "Nursery Flower Plants that bring color and freshness to every space.",
    picture: CATEGORIES_IMG.FLOWER_TREES,
    description:
      "Discover seasonal and ornamental flower plants, nurtured with care to thrive in gardens, farms, and landscapes.",
    seoTitle:
      "Nursery Flower Plants that bring color and freshness to every space.",
    seoDescription:
      "Discover seasonal and ornamental flower plants, nurtured with care to thrive in gardens, farms, and landscapes.",
    heroImage: HERO.FLOWER_TREES,
  },
  SHADOW_TREES: {
    label: "Shadow Trees",
    value: "shadow-trees",
    title: "Shadow Trees that bring natural shade, greenery, and comfort.",
    picture: CATEGORIES_IMG.SHADOW_TREES,
    description:
      "Discover strong shadow trees that create cool spaces, enhance outdoor beauty, and support sustainable living.",
    seoTitle: "Shadow Trees that bring natural shade, greenery, and comfort.",
    seoDescription:
      "Discover strong shadow trees that create cool spaces, enhance outdoor beauty, and support sustainable living.",
    heroImage: HERO.SHADOW_TREES,
  },
  SHOW_TREES: {
    label: "Show Trees",
    value: "show-trees",
    title: "Show Trees for Gardens that Transform Your Landscape.",
    picture: CATEGORIES_IMG.SHOW_TREES,
    description:
      "Add beauty, shade, and elegance to your garden with our wide selection of ornamental show trees designed to thrive in any outdoor space.",
    seoTitle: "Show Trees for Gardens that Transform Your Landscape.",
    seoDescription:
      "Add beauty, shade, and elegance to your garden with our wide selection of ornamental show trees designed to thrive in any outdoor space.",
    heroImage: HERO.SHOW_TREES,
  },
  MASALA: {
    label: "Masala",
    value: "masala",
    title:
      "Authentic Masala Collection - Avocado, Clove, Cinnamon, Bay Leaf & More.",
    picture: CATEGORIES_IMG.MASALA_PLANTS,
    description:
      "Discover premium masalas like avocado, clove, cinnamon, bay leaf, and mix masala, carefully crafted to add richness and authenticity to your meals.",
    seoTitle:
      "Authentic Masala Collection - Avocado, Clove, Cinnamon, Bay Leaf & More.",
    seoDescription:
      "Discover premium masalas like avocado, clove, cinnamon, bay leaf, and mix masala, carefully crafted to add richness and authenticity to your meals.",
    heroImage: HERO.MASALA_PLANTS,
  },
  OTHERS: {
    label: "Others",
    value: "others",
    title: "Fruit Tree Nursery in Uruli Kanchan – Sanas Nursery",
    picture: CATEGORIES_IMG.OTHER_PLANTS,
    description:
      "A wholesale plant nursery providing healthy fruit trees, flower plants, and greenery grown with expert care.",
    seoTitle: "Fruit Tree Nursery in Uruli Kanchan – Sanas Nursery",
    seoDescription:
      "A wholesale plant nursery providing healthy fruit trees, flower plants, and greenery grown with expert care.",
    heroImage: HERO.OTHER_PLANTS,
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
      picture: CARDS.C1,
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
      picture: CARDS.C2,
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
  Gallery: HOME_GALLERY,
  Videos: [
    "https://www.youtube.com/watch?v=WNe8EDa8WPY",
    "https://www.youtube.com/watch?v=9wY_-ZMQ-jQ",
  ],
};

export const SITE_DATA = {
  EMAIL: "sanasnursery@gmail.com",
  phone: "+91 8999481616",
  LOCATION: `Sanas Wholesale Nursery, Bori Fata, near ITI collage, Uruli Kanchan, Maharashtra, 412201`,
  GOOGLE_MAP:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7568.098377421458!2d74.166644!3d18.481431!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2e1579a8e3dc1%3A0xd82516d259aa5ea!2zU2FuYXMgV2hvbGVzYWxlIE51cnNlcnkg4KS24KS-4KSW4KS-IChVcnVsaS1LYW5jaGFuKSBVbml0IDI!5e0!3m2!1sen!2sin!4v1757677710819!5m2!1sen!2sin",
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



