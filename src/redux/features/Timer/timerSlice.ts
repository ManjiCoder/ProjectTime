import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateProps = {
  isActive: boolean;
  timerId: null | NodeJS.Timeout;
  activeType: null | number;
  min: number;
  sec: number;
};

const initialState: initialStateProps = {
  isActive: false,
  timerId: null,
  activeType: null,
  min: 0,
  sec: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
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
    setTimerId: (state, action) => {
      state.timerId = action.payload;
    },
    setActiveName: (state, action) => {
      state.activeType = action.payload;
    },
  },
});

export const {
  updateTimer,
  resetTimer,
  setIsActive,
  setTimerId,
  setActiveName,
} = timerSlice.actions;
export default timerSlice.reducer;
