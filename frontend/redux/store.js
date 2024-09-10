import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import jobSlice from "./jobSlice.js";
import singleJobSlice from "./singleJobSlice.js";
import modeSlice from './modeSlice.js'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import singleCompanySlice from "./singleCompanySlice.js";
import adminJobSlice from "./adminJobSlice.js";
import applicationsSlice from "./applicationsSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  sJob: singleJobSlice,
  company:singleCompanySlice,
  adminJobs: adminJobSlice,
  applications :applicationsSlice,
  theme :modeSlice
  
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
