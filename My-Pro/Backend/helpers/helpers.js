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

module.exports = { randomString, generateUniqueId, getMilliseconds };
