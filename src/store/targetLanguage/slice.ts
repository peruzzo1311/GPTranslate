import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TargetLanguageState {
  targetLanguage: string
}

export const targetLanguageInitialState = {
  targetLanguage: 'Inglês',
} as TargetLanguageState

export const targetLanguageSlice = createSlice({
  name: 'targetLanguage',
  initialState: targetLanguageInitialState,
  reducers: {
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.targetLanguage = action.payload
    },
  },
})

export const { setTargetLanguage } = targetLanguageSlice.actions

export const selectLanguage = (state: TargetLanguageState) =>
  state.targetLanguage

export default targetLanguageSlice.reducer
