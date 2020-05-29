import React, { useState, useEffect, Fragment } from "react";
import "./home.css";
import { withRouter } from "react-router-dom";
import LeftSideSection from "./../../layouts/leftSideSection/LeftSideSection";
import MiddleSection from "./../../layouts/middleSection/MiddleSection";
import RightSideSection from "./../../layouts/rightSideSection/RightSideSection";
import { connect } from "react-redux";
import {
  getAllUsersPosts,
  getIndividualUserPosts,
  getSinglePost,
} from "./../../../redux/actionCreators";

const Home = (props) => {
  // const [currentPath, setCurrentPath] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(props);
    // setCurrentPath(props.match.path);
    let postId = props.match.params.postId;
    console.log("Path is -> " + props.match.path);
    if (props.match.path === "/") {
      props.getAllUsersPosts();
    } else if (props.match.path === "/post/:postId") {
      props.getSinglePost(postId);
    }
  }, [props.match]);

  return (
    <Fragment>
      <div className="three-divs-container" id="main">
        <div className="left-and-middle-divs-container">
          <div className="left-section">
            <LeftSideSection />
          </div>

          <div className="middle-section">
            <MiddleSection />
          </div>
        </div>

        <div className="right-section">
          <RightSideSection />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    centralState: state.central,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIndividualUserPosts: (token, userId) =>
      dispatch(getIndividualUserPosts(token, userId)),
    getAllUsersPosts: () => dispatch(getAllUsersPosts()),
    getSinglePost: (postId) => dispatch(getSinglePost(postId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
