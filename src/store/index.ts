import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './product-slice'
import cartReducer from './cart-slice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

