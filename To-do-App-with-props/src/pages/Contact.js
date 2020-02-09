import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Contact = props => {
  useEffect(() => {
    console.log("Contact - From componentDidMount()");
    console.log(props);
    // eslint-disable-next-line
  }, []);

  return <>This is Contact Page</>;
};

export default withRouter(Contact);
