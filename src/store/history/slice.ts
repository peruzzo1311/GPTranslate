import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HistoryState {
  history: IHistory[]
}

export const historyInitialState = {
  history: [],
} as HistoryState

export const historySlice = createSlice({
  name: 'history',
  initialState: historyInitialState,
  reducers: {
    setHistory: (state, action: PayloadAction<IHistory[]>) => {
      state.history = action.payload
    },
  },
})

export const { setHistory } = historySlice.actions

export const selectLanguage = (state: HistoryState) => state.history

export default historySlice.reducer
