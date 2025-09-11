import { getPublicHomeData } from "./api-public";

// Server-side function to fetch home data
export async function getHomeDataServer() {
  try {
    const response = await getPublicHomeData();
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    // Return default data on error
    return {
      greenChoices: [],
      cards: {},
      gallery: {},
      videos: [],
      testimonials: [],
      bestSellingPlants: [],
    };
  }
}
