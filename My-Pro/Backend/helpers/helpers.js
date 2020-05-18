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
-----------------------------------
  * 1 -> Normal post
  * 2 -> Normal post with image
  * 3 -> Only Image
  * 4 -> 
  

*/

module.exports = { randomString, generateUniqueId };
