import { useCallback, useReducer } from "react";
import { API_BASE_URL, PAGE_SIZE } from "../utils/constant";

const intialState = {
  products: [],
  categories: [],

  status: "idle",
  pagination: {
    currentPage: 1,
    total: 0,
    limit: PAGE_SIZE,
    skip: 0,
    pageRange: 0,
  },

  filters: {
    category: "all",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH__START":
      return {
        ...state,
        status: "loading",
      };
    case "FETCH__SUCCESS": {
      const { products, categories, total } = action.payload;

      const newProducts = (Array.isArray(products) ? products : []).map(
        (product) => {
          return {
            id: product.id,
            brand: product.brand,
            category: product.category,
            description: product.description,
            discount: product.discountPercentage ?? 0,
            image: product.thumbnail ?? "",
            price: product.price,
            rating: product.rating,
            reviews: product.reviews ?? [],
            title: product.title,
            warranty:
              product.warrantyInformation ?? "No warranty for this product",
          };
        },
      );

      const pageRange = Math.ceil(total / state.pagination.limit);
      return {
        ...state,
        products: newProducts,
        categories: Array.isArray(categories) ? categories : [],
        pagination: {
          ...state.pagination,
          total: total,
          pageRange: pageRange,
        },
        status: "succeeded",
      };
    }

    case "SET__PAGE": {
      const newPage = action.payload;
      const newSkip = (newPage - 1) * state.pagination.limit;
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: newPage,
          skip: newSkip,
        },
      };
    }

    case "SET__CATEGORY": {
      const newTotal = state.products.length;
      const newPageRange = Math.ceil(newTotal / state.pagination.limit);
      return {
        ...state,
        filters: {
          ...state.filters,
          category: action.payload,
        },
        pagination: {
          ...state.pagination,
          currentPage: 1,
          skip: 0,
          total: newTotal,
          pageRange: newPageRange,
        },
      };
    }

    case "FETCH__ERROR":
      return {
        ...state,
        status: "failed",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function useProducts() {
  const [{ products, categories, status, pagination, filters }, dispatch] =
    useReducer(reducer, intialState);

  const fetchIntialData = useCallback(
    async function fetchIntialData() {
      dispatch({ type: "FETCH__START" });

      try {
        let productURl = `${API_BASE_URL}/products?limit=${pagination.limit}&skip=${pagination.skip}`;

        if (filters.category !== "all") {
          productURl = `${API_BASE_URL}/products/category/${filters.category}?limit=${pagination.limit}&skip=${pagination.skip}`;
        }

        const categoriesUrl = `${API_BASE_URL}/products/categories`;

        const [productsRes, categoriesRes] = await Promise.all([
          fetch(productURl),
          fetch(categoriesUrl),
        ]);

        const productData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        dispatch({
          type: "FETCH__SUCCESS",
          payload: {
            products: productData?.products ?? [],
            categories: categoriesData ?? [],
            total: productData?.total ?? 0,
          },
        });
      } catch (error) {
        dispatch({ type: "FETCH__ERROR", payload: error.message });
      }
    },
    [pagination.limit, pagination.skip, filters.category],
  );

  function setPage(page) {
    dispatch({
      type: "SET__PAGE",
      payload: page,
    });
  }

  function setCategory(category) {
    dispatch({
      type: "SET__CATEGORY",
      payload: category,
    });
  }

  return {
    products,
    categories,
    status,
    pagination,
    filters,
    fetchIntialData,
    setPage,
    setCategory,
  };
}
