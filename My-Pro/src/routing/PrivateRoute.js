import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const getToken = props.authState.authToken;
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
