import React, { Component } from "react";
import { render } from "react-dom";
import { MentionsInput, Mention } from "react-mentions";
import "./index.css";
// import { swapTags, getUsersFromTags } from "./tags";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      value: "",
      plainText: "",
      singleLineValue: "",
      mentionData: null,
      users: [
        {
          id: "123",
          name: { fullName: "Name - Reynolds", username: "abc" },
        },
        {
          id: "234",
          name: { fullName: "Name - Reynolds", username: "def" },
        },
        {
          id: "345",
          name: { fullName: "Name - Williams", username: "ghi" },
        },
        {
          id: "456",
          name: { fullName: "Name - 456", username: "ijk" },
        },
        {
          id: "567",
          name: { fullName: "Name - 567", username: "lmn" },
        },
        {
          id: "678",
          name: { fullName: "Name - 678", username: "opq" },
        },
        {
          id: "789",
          name: { fullName: "Name - 789", username: "rst" },
        },
      ],
      uniqueUsers: [],
    };
  }

  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    // console.log(newValue, newPlainTextValue, mentions);
    console.log("newPlainTextValue is below");
    console.log(newPlainTextValue);
    console.log("mentions are below");
    console.log(mentions);
    console.log("*************************");

    // this.setState({ uniqueUsers: getUsersFromTags(newValue) });
    this.setState({
      value: newValue,
      mentionData: { newValue, newPlainTextValue, mentions },
      plainText: newPlainTextValue,
    });

    let rgex = /@{{(.*?)}}@/;

    console.log(newValue.match(/@{{\S+/g));
  };

  handleChangeSingle = (e, newValue, newPLainTextValue, mentions) => {
    this.setState({
      singleLineValue: newValue,
    });
  };

  render() {
    const userMentionData = this.state.users.map((myUser) => ({
      id: myUser.id,
      display: `@${myUser.name.username}`,
    }));

    // const displayText = swapTags(this.state.value);
    // const uniqueUsers = getUsersFromTags(this.state.value);
    return (
      <div>
        <p>Start editing to see some magic happen :)</p>
        <MentionsInput
          value={this.state.value}
          onChange={this.handleChange}
          markup="@{{__display__}}"
          placeholder="Type anything, use the @ symbol to tag other users."
          className="mentions"
        >
          <Mention
            type="user"
            appendSpaceOnAdd={true}
            trigger="@"
            markup=" @{{__display__}}@ "
            data={userMentionData}
            className="mentions__mention"
          />
        </MentionsInput>
        <hr />
        {JSON.stringify(this.state.mentionData)}
        <hr />
        <h3>The raw text is:</h3>
        <p>{this.state.value}</p>

        <h3>The plain Text is:</h3>
        <p>{this.state.plainText}</p>

        <h3>The mentionData is:</h3>
        <p>{JSON.stringify(this.state.mentionData)}</p>

        {/* <h3>The displayable text is:</h3>
        <p>{displayText}</p>
        <hr />
        <h3>A list of users mentioned:</h3>
        <p>{JSON.stringify(this.state.uniqueUsers)}</p> */}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
