import React from "react";
import { render } from "react-dom";
import MyEditor from "./MyEditor";

const styles = {
  fontFamily: "sans-serif",
};

const App = () => (
  <div style={styles}>
    <h1>draft-js-mention-plugin</h1>
    <MyEditor />
  </div>
);

render(<App />, document.getElementById("root"));
