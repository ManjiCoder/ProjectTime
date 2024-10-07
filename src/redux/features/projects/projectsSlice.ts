/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectsState {
  [key: string]: any;
}
interface Payload {
  [x: number]: {
    cycles: {
      [x: number]: {
        duration: number;
        count?: number;
      };
    };
    totalTime: number;
  };
}

const initialState: ProjectsState = {
  ProjectTime: {
    // '07-10-2024': {
    //   cycles: {
    //     '25min': { name: 'work', duration: 25, count: 0 },
    //     '45min': { name: 'intensive Focus ', duration: 45, count: 0 },
    //     '60min': { name: 'deep Work', duration: 60, count: 0 },
    //   },
    //   totalTime: 0, // Total time in minutes
    // },
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
      const { key, value } = action.payload;
      try {
        const { totalTime, date, cycleType, duration, count } = value;

        const payload: Payload = {
          [date]: {
            cycles: {
              [cycleType]: { duration },
            },
            totalTime: totalTime,
          },
        };
        if (state[key][date]) {
          if (state[key][date].cycles) {
            payload[date].cycles = {
              ...state[key][date].cycles,
              ...payload[date].cycles,
            };
          }
          // if (state[key][date].totalTime) {
          //   payload[date].totalTime = state[key][date].totalTime + totalTime;
          // }
        }
        if (count) {
          payload[date].cycles[cycleType].count = count;
        }
        state[key] = payload;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { addProject, updateProjectTime } = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.projects;
export default projectsSlice.reducer;
