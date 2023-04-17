import { configureStore } from '@reduxjs/toolkit'

import { languageSlice } from './language/slice'
import { targetLanguageSlice } from './targetLanguage/slice'
import { contextSlice } from './context/slice'

export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    targetLanguage: targetLanguageSlice.reducer,
    context: contextSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
