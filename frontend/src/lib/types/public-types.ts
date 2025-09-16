export interface UserEnquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface HomeData {
  greenChoices: GreenChoicePlant[];
  cards: HomeCards;
  gallery: HomeGallery;
  videos: string[];
  testimonials: Testimonial[];
  bestSellingPlants: BestSellingPlant[];
}

export interface GreenChoicePlant {
  _id: string;
  title: string;
  plantId: string;
  slug: string;
  category: string;
  pictures: string[];
}
export interface HomeCards {
  C1?: HomeCard;
  C2?: HomeCard;
}

export interface HomeGallery {
  G1?: string;
  G2?: string;
  G3?: string;
}

export interface Testimonial {
  _id: string;
  author: string;
  content: string;
  rating: number;
  link?: string;
}

export interface BestSellingPlant {
  _id: string;
  title: string;
  plantId: string;
  category: string;
  pictures: string[];
  slug: string;
}

export interface HomeCard {
  small: string;
  smallColor: string;
  large: string;
  largeColor: string;
  link: {
    label: string;
    address: string;
    color: string;
  };
  picture: string;
}
