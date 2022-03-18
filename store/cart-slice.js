import {createSlice} from "@reduxjs/toolkit";

let cartItems;

// This function is needed to work
// with local storage after rendering from the server
if (typeof window !== 'undefined') {
    cartItems = localStorage.getItem('cartItems')
}

const cartSlice = createSlice({
    name: 'cart', initialState: {
        items: cartItems
            ? JSON.parse(cartItems)
            : [],
        totalQuantity: 0,
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        changed: false,
    }, reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }, addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id, price: newItem.price, quantity: 1, totalPrice: newItem.price, name: newItem.name, image: newItem.image,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items))
        }, removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items))
        }, removeAllItemsFromCart(state){
            state.items = [];
            localStorage.removeItem("cartItems");
            state.changed = true;
        }, getTotals(state) {
            let {total, quantity} = state.items.reduce((cartTotal, cartItem) => {
                const {price, quantity} = cartItem;
                const itemTotal = price * quantity;
                cartTotal.total += itemTotal;
                cartTotal.quantity += quantity;

                return cartTotal
            }, {
                total: 0, quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
