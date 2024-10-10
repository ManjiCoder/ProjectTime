import { RootState } from '@/redux/store';
import { defaultTimeData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TimerKeys = '25min' | '45min' | '60min';
export type actionType = 'increment' | 'decrement' | 'incrementCount' | 'stop';
const initialState = defaultTimeData.cycles;

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateTimer: (
      state,
      action: PayloadAction<{ key: TimerKeys; type: actionType }>
    ) => {
      const { key, type } = action.payload;
      if (type === 'stop') {
        state[key].isRunning = false;
      } else {
        state[key].isRunning = true;
        state[key].sec += 1;
        if (type === 'incrementCount') {
          state[key].count += 1;
        }
      }
    },
    resetTimer: () => {
      return initialState;
    },
  },
});

export const { updateTimer, resetTimer } = timerSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectTimer = (state: RootState) => state.timer;
export default timerSlice.reducer;
