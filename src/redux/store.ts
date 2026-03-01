// "use client";
// import { isDevEnv } from "@src/utils/helper";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { persistReducer } from "redux-persist";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import authSlice from "./reducers/authSlice";

// const createNoopStorage = () => {
//   return {
//     getItem() {
//       return Promise.resolve(null);
//     },
//     setItem(_key: string, value: number) {
//       return Promise.resolve(value);
//     },
//     removeItem() {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// const rootReducer = combineReducers({
//   user: authSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     app: persistedReducer,
//   },
//   devTools: isDevEnv,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// setupListeners(store.dispatch);

//new code


"use client";
import { isDevEnv } from "@src/utils/helper";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { authReducer, cartReducer } from "./reducers/authSlice"; // ⬅️ import both reducers

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // ⬅️ persist both user and cart
};

const rootReducer = combineReducers({
  user: authReducer, // ⬅️ from authSlice
  cart: cartReducer, // ⬅️ from authSlice (cart slice)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    app: persistedReducer,
  },
  devTools: isDevEnv,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

