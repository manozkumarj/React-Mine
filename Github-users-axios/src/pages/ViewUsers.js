import React, { useEffect } from "react";
// import { Link } from "react-router-dom";

const ViewUsers = props => {
  useEffect(() => {
    console.log("props from ViewUsers page are showing below");
    console.log(props);
  },[]);

    return <> This is ViewUsers page </>;
}

export default ViewUsers;
