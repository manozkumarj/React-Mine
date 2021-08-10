import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const authToken = useSelector((state) => state.auth.authToken);

  const { component: Component, ...rest } = props;
  const getPath = rest.path;
  // console.log("authToken -> " + authToken);
  console.log(getPath);

  if (
    getPath === "/register" ||
    getPath === "/login" ||
    getPath === "/recover-account"
  ) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authToken ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          !authToken ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  }
};

export default PrivateRoute;
