import { createSlice, createSelector } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = {
    cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
            saveCartToLocalStorage(state.cart);
        },
        
        addToCart: (state, action) => {
            const product = action.payload;
            const cartItem = state.cart.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            saveCartToLocalStorage(state.cart);
        },

        changeQuantity: (state, action) => {
            const { id, type } = action.payload;
            const cartItem = state.cart.find(item => item.id === id);

            if (cartItem) {
                if (type === 'add') {
                    cartItem.quantity += 1;
                } else if (type === 'remove') {
                    cartItem.quantity -= 1;
                }

                if (cartItem.quantity <= 0) {
                    state.cart = state.cart.filter(item => item.id !== id);
                }
            }
            saveCartToLocalStorage(state.cart);
        },

        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const cartItem = state.cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.quantity = Math.max(0, quantity);
            }
            saveCartToLocalStorage(state.cart);
        },

        clearCart: (state) => {
            state.cart = [];
            saveCartToLocalStorage(state.cart);
        },
    },
});

export const selectCartItems = (state) => state.cart.cart;

export const selectTotalQuantity = createSelector(
    (state) => state.cart.cart,
    (cart) => cart.reduce((acc, product) => acc + product.quantity, 0)
);

export const selectTotalPrice = createSelector(
    (state) => state.cart.cart,
    (cart) => cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
);

export const { setCart, addToCart, changeQuantity, setQuantity, checkout, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
