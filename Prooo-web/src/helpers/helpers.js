export const serverPhotoUrl = "http://localhost:8088/photo/";
export const serverVideoUrl = "http://localhost:8088/video/";

export const randomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const generateUniqueId = () => {
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

export const getMilliseconds = () => {
  let d = new Date();
  return d.getTime().toString();
};

export const getNiceTimestamp = (timeStamp) => {
  if (!(timeStamp instanceof Date)) {
    timeStamp = new Date(timeStamp);
  }

  if (isNaN(timeStamp.getDate())) {
    return "Invalid date";
  }

  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;

  var formatDate = function (date, format, utc) {
    var MMMM = [
      "\x00",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var MMM = [
      "\x01",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dddd = [
      "\x02",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
      var s = i + "";
      len = len || 2;
      while (s.length < len) s = "0" + s;
      return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
      tz = Math.abs(tz);
      var tzHrs = Math.floor(tz / 60);
      var tzMin = tz % 60;
      K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
  };

  if (secondsPast < 30) {
    // Future date
    // return timeStamp;
    return "Just now";
  }
  if (secondsPast < 60) {
    // Less than a minute
    return parseInt(secondsPast) + " secs ago";
  }
  if (secondsPast < 3600) {
    // Less than an hour
    return parseInt(secondsPast / 60) + " mins ago";
  }
  if (secondsPast <= 86400) {
    // Less than a day
    return parseInt(secondsPast / 3600) + " hrs ago";
  }
  if (secondsPast <= 172800) {
    // Less than 2 days
    return "Yesderday at " + formatDate(timeStamp, " h:mm tt");
  }
  if (secondsPast > 172800) {
    // After two days
    var timeString;

    if (secondsPast <= 604800)
      timeString =
        formatDate(timeStamp, " dddd") +
        " at " +
        formatDate(timeStamp, " h:mm tt");
    // with in a week
    else if (now.getFullYear() > timeStamp.getFullYear())
      timeString = formatDate(timeStamp, " MMMM d, yyyy");
    // a year ago
    else if (now.getMonth() > timeStamp.getMonth())
      timeString = formatDate(timeStamp, " MMMM d");
    // months ago
    else
      timeString =
        formatDate(timeStamp, " MMMM d") +
        " at " +
        formatDate(timeStamp, " h:mm tt"); // with in a month

    return timeString;
  }
};

export const blobToFile = (theBlob, fileName) => {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

export const base64URLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
