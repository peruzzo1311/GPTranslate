import { configureStore } from '@reduxjs/toolkit'

import { languageSlice } from './language/slice'

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
