import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import activeChatReducer from './slices/activeChatSlice'

export const store = configureStore({
  reducer: {
    logedUser: userReducer,
    activeChat: activeChatReducer
  },
})