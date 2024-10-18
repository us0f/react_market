import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
  sortComparer: (a, b) => {
    const nameA = a.name || "";
    const nameB = b.name || "";
    return nameA.localeCompare(nameB);
  },
});


const initialState = categoriesAdapter.getInitialState();

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setAllCategories: categoriesAdapter.setAll,
    addCategory: categoriesAdapter.addOne,
    updateCategory: categoriesAdapter.updateOne,
    removeCategory: categoriesAdapter.removeOne,
    setCategoryProducts: (state, action) => {
      const { id, products } = action.payload;
      const existingCategory = state.entities[id];
      if (existingCategory) {
        existingCategory.products = products;
      }
    },

    updateProductInCategory: (state, action) => {
      const { categoryId, productId, changes } = action.payload;
      const existingCategory = state.entities[categoryId];
      if (existingCategory && existingCategory.products) {
        const productIndex = existingCategory.products.findIndex(
          (prod) => prod.id === productId
        );
        if (productIndex > -1) {
          existingCategory.products[productIndex] = {
            ...existingCategory.products[productIndex],
            ...changes,
          };
        }
      }
    },

  },
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const categories = data.map((category) => ({
            id: category.id,
            name: category.name,
            products: category.products || [],
          }));
          dispatch(setAllCategories(categories));
        } catch (error) {
          console.error("Error fetching categories", error);
        }
      },
    }),

    addCategory: builder.mutation({
      query: (initialCategory) => ({
        url: "/categories",
        method: "POST",
        body: { ...initialCategory },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(addCategory(data));
        } catch (error) {
          console.error("Error adding category:", error);
        }
      },
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    updateCategory: builder.mutation({
      query: (initialCategory) => {
        if (!initialCategory.id) {
          throw new Error("Category ID is missing");
        }
        console.log("Updating category with ID:", initialCategory.id);
    
        return {
          url: `/categories/${initialCategory.id}`,
          method: "PUT",
          body: { ...initialCategory },
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCategory({ id: arg.id, changes: data }));
        } catch (error) {
          console.error("Error updating category:", error);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(removeCategory(arg));
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg },
      ],
    }),

    addProduct: builder.mutation({
        query: ({ categoryId, product }) => ({
            url: `/categories/${categoryId}/products`,
            method: 'POST',
            body: product,
        }),
        onQueryStarted: async ({ categoryId, product }, { dispatch, queryFulfilled }) => {
            try {
                const { data } = await queryFulfilled;
                dispatch(updateProductInCategory({ categoryId, productId: data.id, changes: data })); // Update state with new product
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },
        invalidatesTags: (result, error, { categoryId }) => [{ type: 'Category', id: categoryId }],
    }),

    updateProduct: builder.mutation({
      query: ({ categoryId, productId, changes }) => ({
        url: `/categories/${categoryId}/products/${productId}`,
        method: 'PUT',
        body: changes,
      }),
      onQueryStarted: async ({ categoryId, productId, changes }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateProductInCategory({ categoryId, productId, changes: data }));
        } catch (error) {
          console.error("Error updating product:", error);
        }
      },
      invalidatesTags: (result, error, { categoryId }) => [{ type: 'Category', id: categoryId }],
    }),

    deleteProduct: builder.mutation({
      query: ({ categoryId, productId }) => ({
        url: `/categories/${categoryId}/products/${productId}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ categoryId, productId }, { dispatch, queryFulfilled }) => {
        try {
          // Optimistically remove the product from the state
          dispatch(updateProductInCategory({
            categoryId,
            productId,
            changes: null, // Null means we're removing the product
          }));

          await queryFulfilled;

          // Optionally: Dispatch further actions if needed after successful deletion
        } catch (error) {
          console.error("Error deleting product:", error);
          // Optionally: Handle the error, such as rolling back optimistic changes
        }
      },
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Category", id: categoryId },
      ],
    }),
    
  }),
});

export const {
  setAllCategories,
  addCategory,
  updateCategory,
  removeCategory,
  setCategoryProducts,
  addProduct,
  updateProductInCategory,
} = categoriesSlice.actions;

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.categories);

export const selectCategoryByName = (state, name) =>
  selectAllCategories(state).find((category) => category.name === name);

export const selectCategoriesCount = (state) =>
  selectAllCategories(state).length;

export const selectAllProducts = (state) => {
  const categories = selectAllCategories(state);
  return categories.flatMap(category => category.products || []);
};

export const selectMaxProductId = (state) => {
  const products = selectAllProducts(state);
  return products.reduce((maxId, product) => {
      return Math.max(maxId, parseInt(product.id, 10) || 0);
  }, 0);
};

export const selectProductsByCategoryName = (state, categoryName) => {
  const category = selectCategoryByName(state, categoryName);
  return category ? category.products : [];
};

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice;


export default categoriesSlice.reducer;
