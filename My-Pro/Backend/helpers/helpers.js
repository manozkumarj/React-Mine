const randomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const generateUniqueId = () => {
  let d = new Date();
  let millisecondsSince1970 = d.getTime().toString();
  let getUTCMilliseconds = d.getUTCMilliseconds().toString();
  let millisecondsOfTimeRightNow = d.getMilliseconds().toString();
  let getUTCSeconds = d.getUTCSeconds().toString();
  let randomNumbers = Math.round(Math.random() * 100000000).toString();

  let uniqueId =
    getUTCMilliseconds +
    randomNumbers +
    millisecondsOfTimeRightNow +
    getUTCSeconds;
  return uniqueId;
};

const getMilliseconds = () => {
  let d = new Date();
  return d.getTime().toString();
};

const setBorderColors = (borderColor, sides) => {
  let borderSidesObj = {};
  if (sides === "all") {
    borderSidesObj = {
      borderTopColor: borderColor,
      borderRightColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftColor: borderColor,
    };
  } else if (sides === "top") {
    borderSidesObj = {
      borderTopColor: borderColor,
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
    };
  } else if (sides === "right") {
    borderSidesObj = {
      borderTopColor: "transparent",
      borderRightColor: borderColor,
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
    };
  } else if (sides === "bottom") {
    borderSidesObj = {
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: borderColor,
      borderLeftColor: "transparent",
    };
  } else if (sides === "left") {
    borderSidesObj = {
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderLeftColor: borderColor,
    };
  } else if (sides === "leftAndRight") {
    borderSidesObj = {
      borderTopColor: "transparent",
      borderRightColor: borderColor,
      borderBottomColor: "transparent",
      borderLeftColor: borderColor,
    };
  } else if (sides === "topAndBottom") {
    borderSidesObj = {
      borderTopColor: borderColor,
      borderRightColor: "transparent",
      borderBottomColor: borderColor,
      borderLeftColor: "transparent",
    };
  }

  return borderSidesObj;
};

/*
Genders:
-----------------------------------
  * 1 -> Male
  * 2 -> Female
  * 3 -> Other
  
Post privacy:
-----------------------------------
  * 1 -> public
  * 2 -> friends
  * 3 -> me
  
Post Reactions:
-----------------------------------
  * 1 -> Like
  * 2 -> Dislike
  * 3 -> Love
  * 4 -> Wow
  * 5 -> Laugh
  * 6 -> Cry
  * 7 -> Anger

PostTypes:
*************************************************************************************************
* 1) Normal post:
     Required fields:
      -> postContent
* 2) Only Image:
     Required fields:
      -> Image(s)
* 3) Normal post with image:
     Required fields:
      -> postContent
      -> Image(s)
* 4) Custom Background || Text color || both
     Required fields:
      -> postContent
      -> backgroundColor code in HEX format
      -> textColor code in HEX format
* 5) Custom Background && Text color && Border colors
     Required fields:
      -> postContent
      -> backgroundColor code in HEX format
      -> textColor code in HEX format
      -> borderColor code in HEX format
      -> borderStyle (solid, dashed, dotted, double)
      -> borderStyleSides (leftNright, topNbottom, all)
* 6) Custom Background && Text color with border (fold || cut)
     Required fields:
      -> postContent
      -> backgroundColor code in HEX format
      -> textColor code in HEX format
      -> cornerStyle ('fold' || 'cut')
      -> cornerStyleSides (topLeft, topRight, bottomLeft, bottomRight, topLeftAndBottomRight, topRightAndBottomLeft, all)
*/

module.exports = {
  randomString,
  generateUniqueId,
  getMilliseconds,
  setBorderColors,
};
