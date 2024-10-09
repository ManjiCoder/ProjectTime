/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeSpent {
  currentTime: number;
  total: number;
}
interface Cycle {
  name: string;
  duration: number;
  count: number;
  isRunning: boolean;
  timeSpent: TimeSpent;
}
interface ProjectData {
  [key: string]: {
    cycles: {
      [key: string]: Cycle;
    };
    totalTime: number;
  };
}
interface SliceState {
  [projectName: string]: ProjectData;
}

const initialState: SliceState = {
  ProjectTime: {
    '07-10-2024': {
      cycles: {
        '25min': {
          name: 'Work',
          duration: 1500,
          count: 0,
          isRunning: false,
          timeSpent: {
            currentTime: 0,
            total: 0,
          },
        },
        '45min': {
          name: 'Intensive Focus',
          duration: 2700,
          count: 0,
          isRunning: false,
          timeSpent: {
            currentTime: 0,
            total: 0,
          },
        },
        '60min': {
          name: 'Deep Work',
          duration: 3600,
          count: 0,
          isRunning: false,
          timeSpent: {
            currentTime: 0,
            total: 0,
          },
        },
      },
      totalTime: 0,
    },
  },
  MasterTime: {},
  CodingJournal: {},
  MoneyMap: {},
};
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<[string, any]>) => {
      try {
        const [key, value] = action.payload;
        state[key] = value;
      } catch (error) {
        console.log(error);
      }
    },
    updateProjectTime: (state, action) => {
      const p = action.payload;
      console.table(p);
    },
  },
});

export const { addProject, updateProjectTime } = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.projects;
export default projectsSlice.reducer;
