const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

let dbConnectionSuccess = false;

// Below we've used 'async await' syntax
const connetDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
    dbConnectionSuccess = true;
  } catch (error) {
    dbConnectionSuccess = false;
    console.log("Connection was failed, Reason is --> ", error.message);
    process.exit(1);
  }
};

// const isDatabaseReady = () => dbConnectionSuccess;

// Below we've used 'promise' sysntax
// const connetDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     })
//     .then(() => {
//       console.log("MongoDB connected");
//     })
//     .catch(error => {
//       console.log("Connection was failed, Reason is --> ", error.message);
//       process.exit(1);
//     });
// };

module.exports = connetDB;
