import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uid: "",
      photourl: "",
      displayName: "",
    },
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", photourl: "", displayName: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;


export const selectUser = (state: RootState) => state.user.user;




export default userSlice.reducer;
