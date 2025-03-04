import { Environments } from "@/constants/enums";
import { configureStore } from "@reduxjs/toolkit";

// Import reducers
import cartReducer from "@/redux/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV, // Enable Redux DevTools only in development mode
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
