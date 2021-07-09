import React, { useContext, useState } from "react";
import logger from "../components/logger";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../redux/reducers/userReducer";

const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");

  async function register({ data: { email, password } }) {
    try {
      const registrationData = await axios({
        method: "POST",
        data: {
          email,
          password,
        },
        withCredentials: true,
        url: `${SESSIONS_API}/register`,
      });
      if (registrationData.status === 200) {
        history.push("/");
        dispatch(loginUserActionCreator(registrationData.data));
      }
    } catch (err) {
      logger.error({ err: err }, "Registration error.");
      if (err.response && err.response.status === 400) {
        setRegisterError(err.response.data);
      }
      if (
        err.response &&
        err.response.status === 401 &&
        err.response.data.details.length > 0
      ) {
        setRegisterError(err.response.data.details[0].message);
      }
    }
  }

  async function login({ data: { email, password } }) {
    try {
      const loginData = await axios({
        method: "POST",
        data: {
          email,
          password,
        },
        withCredentials: true,
        url: `${SESSIONS_API}/login`,
      });
      if (loginData.status === 200) {
        dispatch(loginUserActionCreator(loginData.data));
        history.push("/");
      }
    } catch (err) {
      logger.error({ err: err }, "Login error");
      if (err.response.status === 401) {
        setLoginError(err.response.data.msg);
      }
      if (err.response.data.details && err.response.status === 401) {
        setLoginError(err.response.data.details[0].message);
      }
    }
  }

  async function logout() {
    try {
      const logoutResponse = await axios({
        method: "GET",
        withCredentials: true,
        url: `${SESSIONS_API}/logout`,
      });
      if (logoutResponse.status === 200) {
        history.push("/auth");
        dispatch(logoutUserActionCreator());
      }
    } catch (err) {
      logger.error({ err: err }, "Logout error");
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...user,
        register,
        login,
        logout,
        loginError,
        registerError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
