import React, { useState } from "react";
import "./search.css";
import { Link } from "react-router-dom";
// Import images
import kohli from "./../../images/kohli.jpg";
import zuck from "./../../images/zuck.jpg";

const Search = () => {
  const [friends, setFriends] = useState([
    { id: 20, status: "friend", name: "Manoj Kumar" },
    {
      id: 26,
      status: "none",
      name: "Aaa Kumar",
      isRequesting: false,
      isRequested: false,
    },
    {
      id: 21,
      status: "pending",
      name: "Mahesh Kumar",
      isDeleting: false,
      isDeleted: false,
      isAccepting: false,
      isAccepted: false,
    },
    {
      id: 22,
      status: "sent",
      name: "Kranthi",
      isCancelling: false,
      isCancelled: false,
    },
    {
      id: 23,
      status: "friend",
      name: "Mallesh",
      isDeleting: false,
      isDeleted: false,
      isAccepting: false,
      isAccepted: false,
    },
    {
      id: 27,
      status: "none",
      name: "Bbb Kumar",
      isRequesting: false,
      isRequested: false,
    },
    { id: 24, status: "pending", name: "Ramesh" },
    {
      id: 25,
      status: "sent",
      name: "Kranthi",
      isCancelling: false,
      isCancelled: false,
    },
  ]);

  // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   console.log("search - Clicked outside");

  //   if (!event.target.matches(".contains")) {
  //     var searchResultsContainer = document.getElementById(
  //       "search_results_container"
  //     );
  //     if (searchResultsContainer.classList.contains("show")) {
  //       searchResultsContainer.classList.remove("show");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   let modifiedFriends = friends.map((friend) => {
  //     let getStatus = friend.status;
  //     if (getStatus === "sent") {
  //       return { ...friend, isCancelling: false, isCancelled: false };
  //     } else if (getStatus === "pending") {
  //       return {
  //         ...friend,
  //         isDeleting: false,
  //         isDeleted: false,
  //         isAccepting: false,
  //         isAccepted: false,
  //       };
  //     }
  //   });

  //   setFriends([...friends, ...modifiedFriends]);
  // }, []);

  const cancelRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = friends.map((friend) => {
      if (friend.id === friendId) {
        return { ...friend, isCancelling: true };
      } else {
        return friend;
      }
    });

    setFriends(mapper);

    setTimeout(() => {
      let mapper = friends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isCancelling: false, isCancelled: true };
        } else {
          return friend;
        }
      });
      setFriends(mapper);
    }, 3000);
  };

  const deleteRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = friends.map((friend) => {
      if (friend.id === friendId) {
        return { ...friend, isDeleting: true };
      } else {
        return friend;
      }
    });

    setFriends(mapper);

    setTimeout(() => {
      let mapper = friends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isDeleting: false, isDeleted: true };
        } else {
          return friend;
        }
      });
      setFriends(mapper);
    }, 3000);
  };

  const acceptRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = friends.map((friend) => {
      if (friend.id === friendId) {
        return { ...friend, isAccepting: true };
      } else {
        return friend;
      }
    });

    setFriends(mapper);

    setTimeout(() => {
      let mapper = friends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isAccepting: false, isAccepted: true };
        } else {
          return friend;
        }
      });
      setFriends(mapper);
    }, 3000);
  };

  const sendRequest = (friendId) => {
    console.log("friendId -> " + friendId);

    let mapper = friends.map((friend) => {
      if (friend.id === friendId) {
        return { ...friend, isRequesting: true };
      } else {
        return friend;
      }
    });

    setFriends(mapper);

    setTimeout(() => {
      let mapper = friends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isRequesting: false, isRequested: true };
        } else {
          return friend;
        }
      });
      setFriends(mapper);
    }, 3000);
  };

  var dropdowns = document.getElementsByClassName(
    "dropdown-action-items-container"
  );
  const dropdownOpener = (id) => {
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
    var idDropdowns = document.getElementById("dropdown-container-frnd-" + id);
    if (!idDropdowns.classList.contains("show")) {
      idDropdowns.classList.add("show");
    }
  };

  // Close the dropdown if the user clicks outside of it
  // window.onclick = function (event) {
  //   if (!event.target.matches(".contains")) {
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains("show")) {
  //         openDropdown.classList.remove("show");
  //       }
  //     }
  //   }
  // };

  return (
    <div className="search-component-container">
      <div className="search-form-container">
        <div className="search-form-item-div">
          <input
            type="text"
            placeholder="Search for users"
            className="search-box"
          />
        </div>
        <div className="search-form-item-div">
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="friends-container">
        {friends &&
          friends.length > 0 &&
          friends.map((friend) => (
            <div
              className="individual-friend-user-details-container"
              key={friend.id}
            >
              <div className="individual-friend-user-dps-container">
                <Link to="/" className="individual-friend-user-dp-primary-a">
                  <img
                    className="individual-friend-user-dp individual-friend-user-dp-primary"
                    src={zuck}
                    alt="avatar"
                  />
                </Link>
                <Link to="/">
                  <img
                    className="individual-friend-user-dp individual-friend-user-dp-secondary"
                    src={kohli}
                    alt="avatar"
                  />
                </Link>
              </div>
              <div className="individual-friend-details-div">
                <div className="post-details-div individual-friend-div">
                  <Link to={"/profile"}>{friend.name}</Link>
                </div>
              </div>

              {/* Sent Request related - starts */}
              {friend.status === "sent" &&
                !friend.isCancelling &&
                !friend.isCancelled && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => dropdownOpener(friend.id)}
                  >
                    <button className="activityButton friends-actions contains">
                      Request Sent <i className="arrow down"></i>
                    </button>
                    <div
                      id={"dropdown-container-frnd-" + friend.id}
                      className="dropdown-action-items-container"
                    >
                      <ul>
                        <li>View Profile</li>
                        <li onClick={() => cancelRequest(friend.id)}>
                          Cancel Request
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              {friend.status === "sent" && friend.isCancelling && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions disable-button"
                    disabled={true}
                  >
                    Cancelling Request...
                  </button>
                </div>
              )}
              {friend.status === "sent" && friend.isCancelled && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions deleted-button"
                    disabled={true}
                  >
                    Request Cancelled
                  </button>
                </div>
              )}
              {/* Sent Request related - ends */}

              {/* Pending Request related - starts */}
              {friend.status === "pending" &&
                !friend.isDeleting &&
                !friend.isDeleted &&
                !friend.isAccepting &&
                !friend.isAccepted && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => dropdownOpener(friend.id)}
                  >
                    <button className="activityButton friends-actions contains">
                      Respond to Request <i className="arrow down"></i>
                    </button>
                    <div
                      id={"dropdown-container-frnd-" + friend.id}
                      className="dropdown-action-items-container"
                    >
                      <ul>
                        <li>View Profile</li>
                        <li onClick={() => deleteRequest(friend.id)}>
                          Delete Request
                        </li>
                        <li onClick={() => acceptRequest(friend.id)}>
                          Accept Request
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              {friend.status === "pending" &&
                (friend.isDeleting || friend.isAccepting) && (
                  <div className="action-items-dropdown">
                    <button
                      className="activityButton friends-actions disable-button"
                      disabled={true}
                    >
                      {friend.isDeleting && "Deleting Request..."}
                      {friend.isAccepting && "Accepting Request..."}
                    </button>
                  </div>
                )}
              {friend.status === "pending" && friend.isDeleted && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions deleted-button"
                    disabled={true}
                  >
                    Request Deleted
                  </button>
                </div>
              )}
              {friend.status === "pending" && friend.isAccepted && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions default-cursor"
                    disabled={true}
                  >
                    Friend
                  </button>
                </div>
              )}
              {/* Pending Request related - ends */}

              {/* Add Friend related -starts */}
              {friend.status === "none" &&
                !friend.isRequesting &&
                !friend.isRequested && (
                  <div
                    className="action-items-dropdown"
                    onClick={() => sendRequest(friend.id)}
                  >
                    <button className="activityButton friends-actions">
                      +Add Friend
                    </button>
                  </div>
                )}
              {friend.status === "none" && friend.isRequesting && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions disable-button"
                    disabled={true}
                  >
                    Sending Request...
                  </button>
                </div>
              )}
              {friend.status === "none" && friend.isRequested && (
                <div className="action-items-dropdown">
                  <button
                    className="activityButton friends-actions accepted-button"
                    disabled={true}
                  >
                    Request Sent
                  </button>
                </div>
              )}
              {/* Add Friend related -ends */}

              {/* Already Friend related -starts */}
              {friend.status === "friend" && (
                <div className="action-items-dropdown">
                  <button className="activityButton friends-actions">
                    Friend
                  </button>
                </div>
              )}
              {/* Already Friend related -ends */}
            </div>
          ))}
        ;
      </div>
    </div>
  );
};

export default Search;
