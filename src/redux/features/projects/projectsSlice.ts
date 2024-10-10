/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
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
interface SliceState {
  [projectName: string]: ProjectData;
}

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
    setProjectState: (state, action) => {},
    updateProjectTime: (state, action) => {},
    stopProjectTimer: (state, action) => {},
  },
});

export const {
  addProject,
  setProjectState,
  updateProjectTime,
  stopProjectTimer,
} = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectProjects = (state: RootState) => state.projects;
export default projectsSlice.reducer;
