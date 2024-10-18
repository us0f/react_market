import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import { apiSlice } from '../features/api/apiSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from "../features/orders/ordersSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    categories: categoriesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
