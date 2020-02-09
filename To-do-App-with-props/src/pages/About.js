import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const About = props => {
  useEffect(() => {
    console.log("About - From componentDidMount()");
    console.log(props);
    // eslint-disable-next-line
  }, []);

  return <>This is About Page</>;
};

export default withRouter(About);
