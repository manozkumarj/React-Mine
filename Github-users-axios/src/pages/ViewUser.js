import React, { useEffect } from "react";

const ViewUser = props => {
  useEffect(() => {
    console.log("props from ViewUser page are showing below");
    console.log(props);
    let userId = props.match.params.id;
    console.log(`Current user ID is -> ${userId}`);
    props.getUser(userId);
    // eslint-disable-next-line
  }, []);

  let { user } = props;
  console.log(user.url);

  let showUser =
    user != "" ? (
      <div
        key={user.id}
        className="card"
        style={{ width: "90%", margin: "auto" }}
      >
        <img
          className="card-img-top"
          src={user.avatar_url}
          alt="Card image"
          style={{ width: "200px", margin: "auto" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={titleStyle}>
            {user.login}
          </h5>
          <p className="card-text">This user's bio is -> {user.bio}</p>
          <span
            className="btn btn-danger"
            onClick={() => this.deleteuser(user.id)}
          >
            Delete user
          </span>
        </div>
      </div>
    ) : (
      <div className="card" style={{ width: "90%", margin: "50px auto" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "Red" }}>
            There are no userData to show
          </h5>
        </div>
      </div>
    );

  return <> {showUser} </>;
};

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewUser;
