import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const AddTodo = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // console.log("AddTodo - From componentDidMount()");
    // console.log(props);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      setTitle("");
      alert("Please enter Title");
      return false;
    } else if (!description.trim()) {
      setDescription("");
      alert("Please enter Description");
      return false;
    }

    let addTodoObj = {
      title,
      description
    };
    // console.log(addTodoObj);
    props.addNewTodo(addTodoObj);
    setTitle("");
    setDescription("");
    // props.history.push("/");
  };

  return (
    <React.Fragment>
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{ margin: "5rem 0 20rem 0" }}
      >
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default withRouter(AddTodo);
