import { API_BASE_URL } from "../utils/constant";

export const fetchProducts = async (limit = 194, skip = 0) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
