import React, { useEffect } from "react";

const ViewUser = props => {
  useEffect(() => {
    console.log("props from ViewUser page are showing below");
    console.log(props);
    let userId = props.match.params.id;
    console.log(`Current user ID is -> ${userId}`);
    // eslint-disable-next-line
  }, []);

  return <> This is ViewUser page </>;
};

export default ViewUser;
