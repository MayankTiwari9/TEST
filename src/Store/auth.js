import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  userId: null,
  bearerToken: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { bearerToken, userId } = action.payload;

      state.isAuthenticated = true;
      state.userId = userId;
      state.bearerToken = bearerToken;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.userId = null;
      state.bearerToken = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
