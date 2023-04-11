import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
  language: string
}

export const languageInitialState = {
  language: 'English',
} as LanguageState

export const languageSlice = createSlice({
  name: 'language',
  initialState: languageInitialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions

export const selectLanguage = (state: LanguageState) => state.language

export default languageSlice.reducer
