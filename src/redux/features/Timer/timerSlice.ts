import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isActive: false,
    min: 0,
    sec: 0,
  },
  reducers: {
    updateTimer: (state) => {
      if (state.sec === 60) {
        state.min += 1;
        state.sec = 0;
      }
      state.sec += 1;
    },
    resetTimer: (state, action: PayloadAction<'min' | 'sec'>) => {
      const key = action.payload;
      if (key === 'min') {
        state.min = 0;
      } else {
        state.sec = 1;
      }
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { updateTimer, resetTimer, setIsActive } = timerSlice.actions;
export default timerSlice.reducer;
