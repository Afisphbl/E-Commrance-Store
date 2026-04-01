import { useCallback, useReducer } from "react";
import { API_BASE_URL, PAGE_SIZE } from "../utils/constant";
import { ceilTo } from "../utils/helper";

const intialState = {
  products: [],
  categories: [],
  dummyProductsHolder: [],

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
    price: 2000,
    sort: {
      value: "default",
      order: "",
    },
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
            image: product.images?.[0] ?? product.thumbnail ?? "",
            price: product.price,
            rating: product.rating,
            reviews: product.reviews ?? [],
            title: product.title,
            warranty:
              product.warrantyInformation ?? "No warranty for this product",

            availability: product.availabilityStatus ?? "Unknown",
            stock: product.stock ?? 0,
            returnPolicy:
              product.returnPolicy ?? "No return policy for this product",
          };
        },
      );

      const pageRange = Math.ceil(total / state.pagination.limit);

      return {
        ...state,
        products: newProducts,
        categories: Array.isArray(categories) ? categories : [],
        dummyProductsHolder: newProducts,
        pagination: {
          ...state.pagination,
          total: total,
          pageRange: pageRange,
        },
        status: "succeeded",
        filters: {
          ...state.filters,
          price: action.payload.priceCeil ?? state.filters.price,
        },
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

    case "SET__PRICE": {
      const { price } = action.payload;
      const newProducts = state.products.filter(
        (product) => product.price <= price,
      );

      const newTotal = newProducts.length;
      const newPageRange = Math.ceil(newTotal / state.pagination.limit);

      return {
        ...state,
        dummyProductsHolder: newProducts,
        filters: {
          ...state.filters,
          price: price,
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

    case "SET__SORT": {
      const { value, order } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          sort: {
            value,
            order,
          },
        },
      };
    }

    case "RESET__FILTERS": {
      return {
        ...state,
        dummyProductsHolder: state.products,
        filters: {
          ...state.filters,
          category: "all",
          price: state.filters.price,
          sort: {
            value: "default",
            order: "",
          },
        },
        pagination: {
          ...state.pagination,
          currentPage: 1,
          skip: 0,
          total: state.products.length,
          pageRange: Math.ceil(state.products.length / state.pagination.limit),
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
  const [
    { products, categories, dummyProductsHolder, status, pagination, filters },
    dispatch,
  ] = useReducer(reducer, intialState);

  const fetchIntialData = useCallback(
    async function fetchIntialData() {
      dispatch({ type: "FETCH__START" });

      try {
        let productURl = `${API_BASE_URL}/products?limit=${pagination.limit}&skip=${pagination.skip}`;

        if (filters.category !== "all") {
          productURl = `${API_BASE_URL}/products/category/${filters.category}?limit=${pagination.limit}&skip=${pagination.skip}`;
        }

        if (filters.sort.value !== "default") {
          productURl = `${API_BASE_URL}/products?sortBy=${filters.sort.value}&order=${filters.sort.order}&limit=${pagination.limit}&skip=${pagination.skip}`;
        }

        const categoriesUrl = `${API_BASE_URL}/products/categories`;

        const [productsRes, categoriesRes] = await Promise.all([
          fetch(productURl),
          fetch(categoriesUrl),
        ]);

        if (!productsRes.ok) {
          throw new Error(`Products fetch failed: ${productsRes.status}`);
        }
        if (!categoriesRes.ok) {
          throw new Error(`Categories fetch failed: ${categoriesRes.status}`);
        }

        const productData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        const maxPrice = productData?.products?.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        const priceCeil = ceilTo(maxPrice, 100);
        dispatch({
          type: "FETCH__SUCCESS",
          payload: {
            products: productData?.products ?? [],
            categories: categoriesData ?? [],
            total: productData?.total ?? 0,
            priceCeil,
          },
        });
      } catch (error) {
        dispatch({ type: "FETCH__ERROR", payload: error.message });
      }
    },
    [
      pagination.limit,
      pagination.skip,
      filters.category,
      filters.sort.order,
      filters.sort.value,
    ],
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

  function setPrice(price) {
    dispatch({
      type: "SET__PRICE",
      payload: price,
    });
  }

  function setSort(sortValue, sortOrder) {
    dispatch({
      type: "SET__SORT",
      payload: {
        value: sortValue,
        order: sortOrder,
      },
    });
  }

  function resetFilters() {
    dispatch({
      type: "RESET__FILTERS",
    });
  }

  return {
    products,
    categories,
    dummyProductsHolder,
    status,
    pagination,
    filters,
    fetchIntialData,
    setPage,
    setCategory,
    setPrice,
    setSort,
    resetFilters,
  };
}
