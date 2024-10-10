import { RootState } from '@/redux/store';
import { defaultTimeData } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = defaultTimeData;

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateTimer: (state, action) => {
      console.log(action.payload);
    },
    resetTimer: () => {
      return defaultTimeData;
    },
  },
});

export const { updateTimer, resetTimer } = timerSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectTimer = (state: RootState) => state.timer;
export default timerSlice.reducer;
