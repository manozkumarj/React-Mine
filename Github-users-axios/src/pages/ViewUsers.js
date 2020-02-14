import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ViewUsers = props => {
  useEffect(() => {
    console.log("props from ViewUsers page are showing below");
    console.log(props);
    // eslint-disable-next-line
  }, []);

  let { users } = props;
  let showUsers =
    users.length > 0 ? (
      users.map(user => {
        return (
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
                <Link to={`/${user.login}`}>{user.login}</Link>
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
        );
      })
    ) : (
      <div className="card" style={{ width: "90%", margin: "50px auto" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "Red" }}>
            There are no users to show
          </h5>
        </div>
      </div>
    );

  return <> {showUsers} </>;
};

const titleStyle = {
  color: "Blue",
  fontSize: "25px"
};

export default ViewUsers;
