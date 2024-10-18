import { createSlice, createSelector } from "@reduxjs/toolkit";

const loadOrdersFromLocalStorage = () => {
  const storedOrders = localStorage.getItem("checkoutOrders");
  const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
  
  const nextId = parsedOrders.length > 0 ? Math.max(...parsedOrders.map(item => item.id)) + 1 : 1;

  return { orders: parsedOrders, nextId };
};

const saveOrdersToLocalStorage = (orders) => {
  localStorage.setItem("checkoutOrders", JSON.stringify(orders));
};

const initialState = loadOrdersFromLocalStorage();

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addCheckoutOrder: (state, action) => {
      const checkoutRecord = {
        id: state.nextId,
        ...action.payload,
      };
      state.orders.unshift(checkoutRecord);
      state.nextId += 1;
      saveOrdersToLocalStorage(state.orders);
    },
    clearOrders: (state) => {
      state.orders = [];
      state.nextId = 1;
      localStorage.removeItem("checkoutOrders");
    },
  },
});

export const { addCheckoutOrder, clearOrders } = ordersSlice.actions;

export const selectAllOrders = createSelector(
  (state) => state.orders.orders,
  (orders) => orders
);

export const selectTotalCount = createSelector(
  (state) => state.orders.orders,
  (orders) => orders.length
);

export const selectOrdersByPage = createSelector(
  [(state, page, itemsPerPage = 5) => state.orders.orders, (state, page, itemsPerPage) => page, (state, page, itemsPerPage) => itemsPerPage],
  (orders, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orders.slice(start, end);
  }
);

export const selectTotalPages = createSelector(
  (state) => state.orders.orders,
  (orders, itemsPerPage = 1) => Math.ceil(orders.length / itemsPerPage)
);

export default ordersSlice.reducer;