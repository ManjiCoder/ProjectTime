import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: <string[] | never>[],
  reducers: {
    addProject: (state, action: PayloadAction<string>) => {
      const projectName = action.payload;
      if (!state.includes(projectName)) {
        state.push(projectName);
      }
    },
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
