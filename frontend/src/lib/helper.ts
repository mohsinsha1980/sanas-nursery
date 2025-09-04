import store from "@/redux/store";
import { AxiosError } from "axios";
import CryptoJS from "crypto-js";

import config from "@/config/env-config";
import { toast } from "sonner";
import { UserInSessionTypes } from "./types/user-types";
import { AddPlantFields } from "./types/admin-types";
import {
  PlantDataType,
  PlantFilterType,
  PlantsCardType,
} from "./types/common-types";

type InputDate = string | Date;
interface errorType {
  error: boolean;
  message: string;
}

export const nameRegEx = /^[A-Za-z\s]+$/;
export const phoneRegEx = /^[6-9]\d{9}$/;
export const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const zipRegEx = /^[1-9]{1}\d{2}\s?\d{3}$/;
export const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const isNumeric = (str: number) => {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const getUserData = () => {
  const currStore = store.getState();
  const { user } = currStore;
  return user;
};

export const isAdmin = () => {
  const { user } = store.getState();
  if (!user || !user.role) {
    return false;
  }
  return user.role === "admin";
};

export const isUser = () => {
  const { user } = store.getState();
  if (!user || !user.role) {
    return false;
  }
  return user.role === "user";
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDate = (inputDate: InputDate): string => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day: number = date.getDate();
  const formattedDay: string = ("0" + day).slice(-2);
  const month: number = date.getMonth();
  const year: number = date.getFullYear();

  return `${monthNames[month]}, ${formattedDay} ${year}`;
};

function getAMPMTime(date: Date): string {
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minuteString = minutes < 10 ? "0" + minutes : minutes;
  const strTime: string = hours + ":" + minuteString + " " + ampm;
  return strTime;
}

export const getFormattedDateAndTime = (inputDate: InputDate): string => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDay();
  const curr_date = date.getDate();
  const formattedDay = ("0" + curr_date).slice(-2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const time = getAMPMTime(date);
  return `${WEEK_DAYS[day]}, ${monthNames[month]} ${formattedDay} ${year} at ${time}`;
};

export const getShortDate = (inputDate: InputDate): string => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDate();
  const formattedDay = ("0" + day).slice(-2);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const shortYear = year.toString().substr(2, 2);

  return `${formattedDay}/${month}/${shortYear}`;
};

export const isUrlValid = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const WEEK_NUMBERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const getDataUrlFromFile = async (fileData: File) => {
  if (!fileData) {
    return;
  }
  const fileBlob = new Blob([fileData], { type: "application/pdf" });
  const reader = new FileReader();
  reader.onloadend = () => {
    return reader.result;
  };
  reader.readAsDataURL(fileBlob);
};

// export const blobToBase64 = async (blob: Blob) => {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
// };

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const str = window.btoa(binary);
  return "data:image/jpeg;base64," + str;
};

export const getFormattedDateTime = (inputDate: InputDate) => {
  if (!inputDate) {
    return "";
  }

  const date = new Date(inputDate);
  const day = date.getDate();
  const formatted_day = ("0" + day).slice(-2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const local_time = getFormattedTime(inputDate);

  return `${formatted_day} ${monthNames[month]} ${year} ${local_time}`;
};

export const getFormattedTime = (inputDate: InputDate) => {
  const d = new Date(inputDate);

  let hours = d.getHours();
  const minutes = d.getMinutes();

  const newformat = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;

  hours = hours ? hours : 12;
  const formatedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return ("0" + hours).slice(-2) + ":" + formatedMinutes + " " + newformat;
};

export const getAgeByDob = (date: InputDate) => {
  if (!date) return "";
  const year_of_birth = new Date(date).getFullYear();
  const current_year = new Date().getFullYear();
  return current_year - year_of_birth;
};

export const getErrorMessage = (e: AxiosError): string => {
  if (e.response?.data) {
    const errorResponse = e.response.data as errorType;
    return errorResponse.message;
  }
  return "Something went wrong!";
};

export const gridInitialPagination = {
  page: 0,
  pageSize: 30,
  total: 0,
};

export const gridInitialPageState = {
  isLoading: false,
  data: [],
  total: 0,
};

export const genericPaginationModel = {
  data: [],
  total: 0,
  page: 0,
  pageSize: 10,
  pages: 0,
};

export const DAYS = [
  { id: 0, value: "Sun" },
  { id: 1, value: "Mon" },
  { id: 2, value: "Tue" },
  { id: 3, value: "Wed" },
  { id: 4, value: "Thu" },
  { id: 5, value: "Fri" },
  { id: 6, value: "Sat" },
];

export const getPicURL = (endpoint: string) => {
  if (!endpoint) return "";
  return `${config.BACKEND_BASE_PATH}/${endpoint}`;
};

export const getFormattedPdfURL = (endpoint: string) => {
  if (!endpoint) return "";
  return `${process.env.NEXT_PUBLIC_BACKEND}/${endpoint}`;
};

export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export function capitalizeFirstChar(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// export const getFullAddress = (address: Address): string => {
//   if (!address) {
//     return "";
//   }
//   return `${address.address1}, ${
//     address.address2 ? address.address2 + ", " : ""
//   }${address.city}, ${address.state}, ${address.zip}`;
// };

export const STATUS = {
  ACTIVE: "0",
  INACTIVE: "1",
  DELETED: "2",
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

//   return params.toString() ? "?" + params.toString() : "";
// };

// export const constructProductLink = (data: ProductCardType): string => {
//   let link = "/";
//   link = link + data.l1_category + "/" + data.l2_category;
//   if (data.l3_category) {
//     link = link + "/" + data.l3_category;
//   }
//   link = link + "/" + data.slug + "/" + data.id;
//   return link;
// };

export const getPlantsCardData = (plant: PlantDataType): PlantsCardType => {
  return {
    id: plant._id,
    title: plant.title,
    pictures: plant.pictures.map((item: string) => {
      return getPicURL(item);
    }),
    slug: plant.slug,
    category: plant.category,
  };
};

export function getPaginatedMasterData<T>(
  array: T[],
  pageIndex: number,
  pageSize: number
): T[] {
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}

// export const getTrendyProductCardData = (
//   product: TrendyProductDataType
// ): HomeProductCardType => {
//   return {
//     id: product._id,
//     title: product.title,
//     sellingPrice: Math.round(product.variants[0].sellingPrice),
//     discount: product.variants[0].discount,
//     mrp: Math.round(product.variants[0].mrp),
//     l1_category: product.l1_category?.slug,
//     l2_category: product.l2_category?.slug,
//     l3_category: product.l3_category?.slug || "",
//     pictures: product.pictures.map((item: string) => {
//       return process.env.NEXT_PUBLIC_BACKEND + "/" + item;
//     }),
//     slug: product.slug,
//     avgRating: product.avgRating,
//     totalReviews: product.totalReviews,
//     l2_category_label: product.l2_category?.label || "",
//     l3_category_label: product.l3_category?.label || "",
//   };
// };

export const showErrorToast = (message: string): void => {
  const id = toast.error(message, {
    position: "top-center",
    duration: 5000, // Infinity
    action: {
      label: "Dismiss",
      onClick: () => toast.dismiss(id),
    },
    className: "custom-toast-error",
  });
};

export const showSuccessToast = (message: string, duration?: number): void => {
  toast.success(message, {
    position: "top-center",
    duration: duration ? duration : 5000,
    className: "success_custom-toast",
  });
};

export const formatMonthYear = (date: Date): string => {
  const options = { year: "numeric" as const, month: "long" as const };
  return new Date(date).toLocaleDateString("en-US", options);
};

// export const formatAddress = (address: Address | undefined): string => {
//   if (!address) {
//     return "-";
//   }
//   const { address1, address2, city, state, zip } = address;
//   const country = "India";

//   return `${address1}${
//     address2 ? ", " + address2 : ""
//   }, ${city}, ${state} - ${zip}, ${country}`;
// };

export const encryptData = (data: UserInSessionTypes) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY as string
    ).toString();
    return encrypted;
  } catch (error) {
    console.log("encrypted error ", error);
    return "";
  }
};

export const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      config.ENCRYPTION_SECRET_KEY
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log("decryptData error", error);
    return null;
  }
};

export const generateSlug = (nameValue: string) => {
  return nameValue.trim().toLowerCase().replace(/\s+/g, "-");
};

export function getFaqAccrItems(faqs: AddPlantFields["faqs"]) {
  return faqs.map((faq, index) => ({
    id: `faq-${index + 1}`,
    title: faq.question,
    content: [faq.answer],
    index,
  }));
}

export const buildQueryString = (searchParams: PlantFilterType) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([Key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(Key, v.toString()));
      } else {
        params.append(Key, value.toString());
      }
    }
  });

  return params.toString() ? "?" + params.toString() : "";
};
