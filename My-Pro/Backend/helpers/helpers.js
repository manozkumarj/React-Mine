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

/*
Genders:
-----------------------------------
  * 1 -> Male
  * 2 -> Female
  * 3 -> Other

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
      -> background color code in HEX format
      -> Text color code in HEX format
* 5) Custom Background && Text color && Border colors
     Required fields:
      -> postContent
      -> background color code in HEX format
      -> Text color code in HEX format
      -> border color code in HEX format
      -> borderStyle (solid, dashed, dotted, double)
      -> borderStyleSides (leftNright, topNbottom, all)
* 6) Custom Background && Text color with border (fold || cut)
     Required fields:
      -> postContent
      -> background color code in HEX format
      -> Text color code in HEX format
      -> cornerStyle ('fold' || 'cut')
      -> cornerStyleSides (topLeft, topRight, bottomLeft, bottomRight, topLeftNbottomRight, topRightNbottomLeft, all)
*/

module.exports = { randomString, generateUniqueId };
