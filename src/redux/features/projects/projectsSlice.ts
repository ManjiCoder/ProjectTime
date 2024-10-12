/* eslint-disable @typescript-eslint/no-unused-vars */
import { RootState } from '@/redux/store';
import { defaultTimeData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cycle {
  name: string;
  duration: number;
  count: number;
  isRunning: boolean;
  sec: number;
}
export interface ProjectData {
  [key: string]: {
    cycles: {
      [key: string]: Cycle;
    };
    totalTime: number;
  };
}
export interface projectState {
  [projectName: string]: ProjectData;
}

const initialState: projectState = {
  ProjectTime: {},
  MasterTime: {},
  CodingJournal: {},
  MoneyMap: {},
};
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<{ projectName: string }>) => {
      try {
        const { projectName } = action.payload;
        state[projectName] = {};
      } catch (error) {
        console.log('reducer not works');
      }
    },
    updateProjectTimer: (state, action: PayloadAction<Payload>) => {
      const { projectName, currentDate, cycleType } = action.payload;
      try {
        if (cycleType) {
          state[projectName][currentDate].cycles[cycleType].isRunning = true;
          state[projectName][currentDate].cycles[cycleType].sec += 1;
        }
      } catch (error) {
        console.log('reducer not works');
      }
    },
    setProjectState: (state, action: PayloadAction<Payload>) => {
      const { projectName, currentDate } = action.payload;
      try {
        state[projectName][currentDate] = {
          ...defaultTimeData,
          ...state[projectName][currentDate],
        };
      } catch (error) {
        console.log('reducer not works');
      }
    },
    stopProjectTimer: (state, action: PayloadAction<Payload>) => {
      const { projectName, currentDate, cycleType, increamentCount } =
        action.payload;
      try {
        if (cycleType) {
          state[projectName][currentDate].cycles[cycleType].isRunning = false;
          if (increamentCount) {
            state[projectName][currentDate].cycles[cycleType].count += 1;
            state[projectName][currentDate].cycles[cycleType].sec = 0;
          }
        }
      } catch (error) {
        console.log('reducer not works');
      }
    },
  },
});

export const {
  addProject,
  updateProjectTimer,
  stopProjectTimer,
  setProjectState,
} = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects;
export default projectsSlice.reducer;
export interface Payload {
  projectName: string;
  currentDate: string;
  cycleType?: string;
  increamentCount?: boolean;
}
