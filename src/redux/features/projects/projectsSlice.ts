/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for your state
interface ProjectsState {
  [key: string]: any;
}

const initialState: ProjectsState = {
  ProjectTime: {
    '2024-10-03': {
      totalTime: 315, // Total time in minutes
      cycles: {
        standard: {
          work: { duration: 25, count: 4 },
          shortBreak: { duration: 5, count: 3 },
          longBreak: { duration: 15, count: 1 },
        },
        focusCycles: {
          predefined: {
            intensiveFocus: { duration: 45, count: 1 },
            deepWork: { duration: 60, count: 2 },
          },
          userDefined: {
            CreativeSession: { duration: 50, count: 1 },
            ResearchTime: { duration: 90, count: 1 },
          },
        },
      },
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
  },
});

export const { addProject } = projectsSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.projects;
export default projectsSlice.reducer;
