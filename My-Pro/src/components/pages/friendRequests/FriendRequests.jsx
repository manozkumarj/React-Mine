import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./friendRequests.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import { connect, useDispatch, useSelector } from "react-redux";
import { friendshipAction } from "./../../../redux/actionCreators";
import { searchUsers } from "./../../../redux/actionCreators";
import defaultAvatar from "../../../images/avatar.png";
import { getLoggedInUserDetails } from "./../../../redux/actionCreators";

const FriendRequests = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);

  const dispatch = useDispatch();
  let currentLoggedInUserId = useSelector(
    (state) => state.central.loggedInUserId
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await dispatch(
        getLoggedInUserDetails(currentLoggedInUserId)
      );
      console.log("response is below");
      console.log(response);

      let friends = response.data;
      if (friends && friends.length > 0) {
        let filterPendingRequests = friends.filter(
          (friend) => friend.status === "pending"
        );
        if (filterPendingRequests.length > 0) {
          let mapFilterPendingRequests = filterPendingRequests.map((friend) => {
            return {
              ...friend,
              deletingRequest: false,
              deletedRequest: false,
              acceptingRequest: false,
              acceptedRequest: false,
            };
          });
          setUsersList(mapFilterPendingRequests);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.log("getLoggedInUserDetails dispatch triggered an error");
      console.log(e);
      setIsLoading(false);
    }
  };

  let handleDeleteClick = async (id) => {
    console.log("user._id --> " + id);

    let mapper = usersList.map((friend) => {
      if (friend.friendId._id === id) {
        return { ...friend, deletingRequest: true };
      } else {
        return friend;
      }
    });

    setUsersList(mapper);

    try {
      const response = await dispatch(friendshipAction(id, "deleteRequest"));
      if (response.status === "success") {
        // let removeItem = usersList.filter((user) => user.friendId._id !== id);
        // setUsersList(removeItem);

        let mapper = usersList.map((friend) => {
          if (friend.friendId._id === id) {
            return {
              ...friend,
              deletingRequest: false,
              deletedRequest: true,
            };
          } else {
            return friend;
          }
        });

        setUsersList(mapper);
      } else {
        alert("friendshipAction dispatch triggered an error");
      }
    } catch (e) {
      console.log("friendshipAction dispatch triggered an error");
      console.log(e);
      alert("friendshipAction dispatch triggered an error");
    }
  };

  let handleAcceptClick = async (id) => {
    console.log("user._id --> " + id);

    let mapper = usersList.map((friend) => {
      if (friend.friendId._id === id) {
        return { ...friend, acceptingRequest: true };
      } else {
        return friend;
      }
    });

    setUsersList(mapper);

    try {
      const response = await dispatch(friendshipAction(id, "acceptRequest"));
      if (response.status === "success") {
        // let removeItem = usersList.filter((user) => user.friendId._id !== id);
        // setUsersList(removeItem);

        let mapper = usersList.map((friend) => {
          if (friend.friendId._id === id) {
            return {
              ...friend,
              acceptingRequest: false,
              acceptedRequest: true,
            };
          } else {
            return friend;
          }
        });

        setUsersList(mapper);
      } else {
        alert("friendshipAction dispatch triggered an error");
      }
    } catch (e) {
      console.log("friendshipAction dispatch triggered an error");
      console.log(e);
      alert("friendshipAction dispatch triggered an error");
    }
  };

  return (
    <div className="three-divs-container" id="main">
      <div className="left-and-middle-divs-container">
        <div className="left-section">
          <LeftSideSection />
        </div>

        <div className="middle-section">
          <div className="friends-container">
            <div className="friends-container-header">Sent Requests</div>
            <div className="friends">
              {isLoading && <div>Loading...</div>}
              {!isLoading && usersList && usersList.length === 0 && (
                <div>No sent Requests</div>
              )}
              {!isLoading &&
                usersList &&
                usersList.map((user) => {
                  let userPrimaryDp = user.friendId.primaryDp
                    ? imagesUrl + user.friendId.primaryDp
                    : defaultAvatar;
                  return (
                    <div
                      className="individual-friend-div"
                      id="individual-friend-div"
                      key={user.friendId._id}
                      data-id={user.friendId._id}
                    >
                      <div className="friend-name">
                        <Link
                          to={"/" + user.friendId.username}
                          className="global-aTag-style"
                        >
                          <img
                            src={userPrimaryDp}
                            className="search_result_user_dp"
                            alt="Username"
                          />
                        </Link>
                        <Link
                          to={"/" + user.friendId.username}
                          className="global-aTag-style"
                        >
                          {user.friendId.fullName}
                        </Link>
                      </div>

                      <div className="friendship-status-div">
                        {!user.deletingRequest && user.deletedRequest && (
                          <button
                            disabled
                            className={
                              "friendship-status-btn changed-status-nagative friendship-status-btn-" +
                              user.friendId._id
                            }
                            id="individual-friend-div"
                          >
                            Request deleted
                          </button>
                        )}

                        {(user.deletingRequest || user.acceptingRequest) && (
                          <button
                            disabled
                            className={
                              "friendship-status-btn changing-status friendship-status-btn-" +
                              user.friendId._id
                            }
                            id="individual-friend-div"
                          >
                            {user.deletingRequest && "Deleting..."}
                            {user.acceptingRequest && "Accepting..."}
                          </button>
                        )}

                        {!user.acceptingRequest && user.acceptedRequest && (
                          <button
                            disabled
                            className={
                              "friendship-status-btn friendship-status-nagative friendship-status-btn-" +
                              user.friendId._id
                            }
                            id="individual-friend-div"
                          >
                            Friends
                          </button>
                        )}

                        {!user.deletingRequest &&
                          !user.deletedRequest &&
                          !user.acceptingRequest &&
                          !user.acceptedRequest && (
                            <button
                              className={
                                "friends-list-individual friendship-status-btn friendship-status-btn-" +
                                user.friendId._id
                              }
                              id="individual-friend-div"
                              data-id={user.friendId._id}
                            >
                              Respond to Request <span> &#8595;</span>
                            </button>
                          )}
                        <div
                          className="dropdown-content"
                          id={"dropd-" + user.friendId._id}
                        >
                          <Link to={"/" + user.friendId.username}>
                            View Profile
                          </Link>
                          <span
                            href="#"
                            className="cancel-individual-user"
                            data-id={user.friendId._id}
                            onClick={() => handleAcceptClick(user.friendId._id)}
                          >
                            Accept Request
                          </span>
                          <span
                            href="#"
                            className="cancel-individual-user"
                            data-id={user.friendId._id}
                            onClick={() => handleDeleteClick(user.friendId._id)}
                          >
                            Delete Request
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="right-section">
        <RightSideSection />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchUsers: (searchWord) => dispatch(searchUsers(searchWord)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
