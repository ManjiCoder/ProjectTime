/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeSpent {
  sec: number;
  total: number;
}
interface Cycle {
  name: string;
  duration: number;
  count: number;
  isRunning: boolean;
  timeSpent: TimeSpent;
}
export interface ProjectData {
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

const defaultTimeData = {
  cycles: {
    '25min': {
      name: 'Work',
      duration: 1500,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
    '45min': {
      name: 'Intensive Focus',
      duration: 2700,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
    '60min': {
      name: 'Deep Work',
      duration: 3600,
      count: 0,
      isRunning: false,
      timeSpent: {
        sec: 0,
        total: 0,
      },
    },
  },
  totalTime: 0,
};
const initialState: SliceState = {
  ProjectTime: {},
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
    setProjectState: (state, action) => {
      try {
        const { name, date } = action.payload;
        state[name][date] = defaultTimeData;
      } catch (error) {
        console.log(error);
      }
    },
    updateProjectTime: (state, action) => {
      const { projectName, currentDate, cycleType } = action.payload;

      if (!state[projectName][currentDate]) {
        state[projectName][currentDate] = defaultTimeData;
      } else {
        state[projectName][currentDate].cycles[cycleType].isRunning = true;
        state[projectName][currentDate].cycles[cycleType].timeSpent.sec += 1;
        state[projectName][currentDate].cycles[cycleType].timeSpent.total += 1;
      }
    },
    stopProjectTimer: (state, action) => {
      try {
        const { projectName, currentDate, cycleType , increamentCount=false} = action.payload;
        if (!state[projectName][currentDate]) {
          state[projectName][currentDate] = defaultTimeData;
        }
        state[projectName][currentDate].cycles[cycleType].isRunning = false;
        if(increamentCount){
          state[projectName][currentDate].cycles[cycleType].count+=1
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const {
  addProject,
  setProjectState,
  updateProjectTime,
  stopProjectTimer,
} = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.projects;
export default projectsSlice.reducer;
