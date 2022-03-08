import {configureStore} from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';
import {userSlice} from "./users-slice";

const store = configureStore({
    reducer: {ui: uiSlice.reducer, cart: cartSlice.reducer, user: userSlice.reducer},
});

export default store;
