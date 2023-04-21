import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userData: {
    name: string;
    id: string;
  };
}

const initialState: UserState = {
  userData: {
    name: "",
    id: "",
  },
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { updateUser } = counterSlice.actions;

export const getCurrentUser = (state) => state;

export const staffAuthState = createSelector(
  [getCurrentUser],
  (state) => state
);
export const currentUserInfo = createSelector(
  [getCurrentUser],
  (state) => state.user.userData
);

export default counterSlice.reducer;
