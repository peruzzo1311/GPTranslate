import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ContextState {
  context: string
}

export const contextInitialState = {
  context: 'frase',
} as ContextState

export const contextSlice = createSlice({
  name: 'context',
  initialState: contextInitialState,
  reducers: {
    setContext: (state, action: PayloadAction<string>) => {
      state.context = action.payload
    },
  },
})

export const { setContext } = contextSlice.actions

export const selectLanguage = (state: ContextState) => state.context

export default contextSlice.reducer
