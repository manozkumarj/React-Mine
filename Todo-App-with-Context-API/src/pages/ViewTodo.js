import React, { useEffect } from "react";

const ViewTodo = props => {
  useEffect(() => {
    console.log("props from ViewTodo page are showing below");
    console.log(props);
    let todoId = props.match.params.id;
    console.log(`Current user ID is -> ${todoId}`);
    // eslint-disable-next-line
  }, []);

  return <> This is View Todo page </>;
};

// const titleStyle = {
//   color: "Blue",
//   fontSize: "25px"
// };

export default ViewTodo;
