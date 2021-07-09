import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/materialTheme";
import { UserProvider } from "./context/user_context";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import logger from "redux-logger";
import { FeedbackProvider } from "./context/feedback_context";

import { checkSession } from "./utils/session";

const renderApp = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer(),
    preloadedState,
    middleware: [...getDefaultMiddleware(), logger],
    //devTools: false, // in production
  });
  window.state = store.getState;
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <UserProvider>
              <FeedbackProvider>
                <App />
              </FeedbackProvider>
            </UserProvider>
          </ThemeProvider>
        </ReduxProvider>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

(async () => renderApp(await checkSession()))();
