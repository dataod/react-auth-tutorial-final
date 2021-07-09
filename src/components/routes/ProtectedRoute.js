import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../../context/user_context";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const {
    session: { userId },
  } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        userId !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
