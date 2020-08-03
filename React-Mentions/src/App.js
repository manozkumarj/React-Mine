import React, { Component } from "react";
import "./App.css";
import { MentionsInput, Mention } from "react-mentions";
import { swapTags, getUsersFromTags } from "./tags";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      value: "",
      singleLineValue: "",
      mentionData: null,
      users: [
        {
          _id: "123",
          name: { first: "John", last: "Reynolds" },
        },
        {
          _id: "234",
          name: { first: "Holly", last: "Reynolds" },
        },
        {
          _id: "345",
          name: { first: "Ryan", last: "Williams" },
        },
      ],
    };
  }

  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    console.log(newValue, newPlainTextValue, mentions);
    this.setState({
      value: newValue,
      mentionData: { newValue, newPlainTextValue, mentions },
    });
  };

  handleChangeSingle = (e, newValue, newPLainTextValue, mentions) => {
    this.setState({
      singleLineValue: newValue,
    });
  };

  render() {
    const userMentionData = this.state.users.map((myUser) => ({
      id: myUser._id,
      display: `${myUser.name.first} ${myUser.name.last}`,
    }));

    const displayText = swapTags(this.state.value);
    const uniqueUsers = getUsersFromTags(this.state.value);
    return (
      <div>
        <div> name={this.state.name}</div>
        <p>Start editing to see some magic happen :)</p>
        <MentionsInput
          value={this.state.value}
          onChange={this.handleChange}
          markup="@{{__type__||__id__||__display__}}"
          placeholder="Type anything, use the @ symbol to tag other users."
          className="mentions"
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention"
          />
        </MentionsInput>
        <hr />
        {JSON.stringify(this.state.mentionData)}
        <hr />
        <h3>The raw text is:</h3>
        <p>{this.state.value}</p>
        <h3>The displayable text is:</h3>
        <p>{displayText}</p>
        <hr />
        <h3>A list of users mentioned:</h3>
        <p>{JSON.stringify(uniqueUsers)}</p>
      </div>
    );
  }
}

export default App;
