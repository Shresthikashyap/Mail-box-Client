import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSlice';
import unreadEmailsReducer from "./UnreadEmailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    unreadEmails: unreadEmailsReducer,
  }
});

export default store;