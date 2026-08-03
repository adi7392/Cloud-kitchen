import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "../storage";

// Reducers
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import menuReducer from "./slices/menuSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  menu: menuReducer,
  cart: cartReducer,
  orders: orderReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: "cloud-kitchen",
  storage,

  // Persist only the data you want after refresh
  whitelist: ["auth", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);