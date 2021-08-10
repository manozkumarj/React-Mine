import React, { Fragment, useState, useEffect } from "react";
import "./flipcardPostDisplayer.css";
import ReactCardFlip from "react-card-flip";

import { serverPhotoUrl } from "./../../helpers/helpers";

const FlipcardPostDisplayer = (props) => {
  const { postData } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState("horizontal");
  const [flipcardFrontPhoto, setFlipcardFrontPhoto] = useState(null);
  const [flipcardBackPhoto, setFlipcardBackPhoto] = useState(null);

  useEffect(() => {
    let getFlipDirectionId = postData[0].flipDirection;
    let flipDirectionVal = getFlipDirectionId === 1 ? "horizontal" : "vertical";
    setFlipDirection(flipDirectionVal);
    setFlipcardFrontPhoto(serverPhotoUrl + postData[0]["photos"][0]);
    setFlipcardBackPhoto(serverPhotoUrl + postData[0]["photos"][1]);
  }, [props]);

  const handleFlipClick = () => {
    setIsFlipped({ isFlipped: !isFlipped });
  };

  return (
    <Fragment>
      {postData[0].postContent && (
        <div className="post-description-container">
          <div className="post-description">{postData[0].postContent}</div>
        </div>
      )}
      <div className="post-description-container">
        <ReactCardFlip
          isFlipped={isFlipped}
          flipDirection={flipDirection}
          infinite={true}
          flipSpeedBackToFront={0.6}
          containerStyle={{ textAlign: "center" }}
        >
          <div>
            <img
              src={flipcardFrontPhoto}
              height={300}
              width={300}
              alt="front"
              className="flipcard-photo"
            />
          </div>

          <div>
            <img
              src={flipcardBackPhoto}
              height={300}
              width={300}
              alt="back"
              className="flipcard-photo"
            />
          </div>
        </ReactCardFlip>
        <div className="flip-button-container">
          <button
            type="button"
            className="flip-button"
            onClick={handleFlipClick}
          >
            Click to flip
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FlipcardPostDisplayer;
