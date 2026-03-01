// "use client";
// import { UserData, UserState } from "@src/utils/types/authSliceTypes";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// const initialState: UserState = {
//   authToken: null,
//   userData: null,
// };

// export const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<UserData>) {
//       state.userData = action.payload;
//     },
//     removeUser(state) {
//       state.userData = null;
//     },
//     setAuthToken(state, action: PayloadAction<string | null>) {
//       state.authToken = action.payload;
//     },
//     removeAuthToken(state) {
//       state.authToken = null;
//     },
//   },
// });

// export const { setUser, removeUser, setAuthToken, removeAuthToken } =
//   authSlice.actions;

// export default authSlice.reducer;

// export const selectAuthToken = (state: RootState) =>
//   state?.app?.user?.authToken ?? null;

// export const selectUser = (state: RootState) =>
//   state?.app?.user?.userData ?? null;

//new code

"use client";
import { UserData, UserState } from "@src/utils/types/authSliceTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

//
// -------------------- AUTH SLICE --------------------
//
const initialState: UserState = {
  authToken: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = null;
    },
    setAuthToken(state, action: PayloadAction<string>) {
      state.authToken = action.payload;
    },
    removeAuthToken(state) {
      state.authToken = null;
    },
  },
});

export const { setUser, removeUser, setAuthToken, removeAuthToken } =
  authSlice.actions;

export const selectAuthToken = (state: RootState) =>
  state?.app?.user?.authToken ?? null;
export const selectUser = (state: RootState) =>
  state?.app?.user?.userData ?? null;

//
// -------------------- CART SLICE --------------------
//
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
}

const initialCartState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      // Validate payload
      if (
        !action.payload ||
        !action.payload.id ||
        !action.payload.quantity ||
        !action.payload.selectedSize
      ) {
        console.warn("Invalid payload for addToCart:", action.payload);
        return;
      }

      // Ensure state.items is always an array
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      // Remove any non-object or empty array items
      state.items = state.items.filter(
        (item) => item && typeof item === "object" && !Array.isArray(item)
      );

      // Check for existing item with same id AND selectedSize
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (existingItem) {
        // If item with same id and selectedSize exists, increment quantity
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // Otherwise, add as a new item
        state.items.push({
          ...action.payload,
          totalPrice: action.payload.price * action.payload.quantity,
        });
      }

      // Update total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; selectedSize: string }>
    ) => {
      console.log("removeFromCart payload:", action.payload);
      const itemExists = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (!itemExists) {
        console.warn(
          `No item found to remove for id: ${action.payload.id} and selectedSize: ${action.payload.selectedSize}`
        );
        return;
      }

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize
          )
      );

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action: PayloadAction<any>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          action.payload.selectedSize === item.selectedSize
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) =>
  state?.app?.cart?.items ?? [];

export const selectCartTotal = (state: RootState) =>
  state?.app?.cart?.items?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) ?? 0;

// -------------------- CART COUNT SELECTOR --------------------
export const selectCartCount = (state: RootState) =>
  state?.app?.cart?.items?.reduce((count, item) => count + item.quantity, 0) ??
  0;

// -------------------- EXPORT REDUCERS --------------------
export const authReducer = authSlice.reducer;
export const cartReducer = cartSlice.reducer;
