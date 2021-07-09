import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "./initialState";

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload);
      const {
        userId,
        email,
        username,
        emailVerified,
        shippingInfo,
        feedbackAvailable,
      } = payload;

      return {
        ...state,
        session: {
          userId,
          email,
          username,
          emailVerified,
          shippingInfo,
          feedbackAvailable,
        },
      };
    },
    logout: (state) => {
      return {
        ...state,
        session: {
          userId: null,
          email: null,
        },
      };
    },
  },
});

export const {
  login: loginUserActionCreator,
  logout: logoutUserActionCreator,
} = userSlice.actions;

export default userSlice.reducer;
