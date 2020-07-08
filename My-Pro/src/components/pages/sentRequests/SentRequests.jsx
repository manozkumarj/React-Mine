import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sentRequests.css";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import { connect, useDispatch, useSelector } from "react-redux";
import { searchUsers } from "./../../../redux/actionCreators";
import defaultAvatar from "../../../images/avatar.png";
import { getLoggedInUserDetails } from "./../../../redux/actionCreators";

const SentRequests = (props) => {
  const [imagesUrl, setImagesUrl] = useState("http://localhost:8088/photo/");
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState(
    props.centralState.loggedInUserFriends
  );
  const [loggedInUserFriends, setLoggedInUserFriends] = useState(
    props.centralState.loggedInUserFriends
  );

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
        let requests = friends.filter((friend) => friend.status === "sent");
        setUsersList(requests);
      }

      setIsLoading(false);
    } catch (e) {
      console.log("getLoggedInUserDetails dispatch triggered an error");
      console.log(e);
      setIsLoading(false);
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
              {isLoading && usersList && usersList.length === 0 && (
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
                    >
                      <div className="flexBox">
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
                          <div
                            className="friends-list-individual request-friendshp-btn"
                            id="1"
                          >
                            Friends
                          </div>
                        </div>
                      </div>

                      <div className="flexBox">
                        <div className="friendship-status-div">
                          <div
                            className="friends-list-individual request-friendshp-btn"
                            id="1"
                          >
                            View Profile
                          </div>
                        </div>
                        <div className="friendship-status-div">
                          <div
                            className="friends-list-individual request-friendshp-btn"
                            id="1"
                          >
                            Cancel request
                          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SentRequests);
