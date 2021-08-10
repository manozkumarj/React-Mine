const multer = require("multer");
const sharp = require("sharp");
const helpers = require("../helpers/helpers");

const storage = multer.diskStorage({
  destination: "./videos/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb("Please upload only video.", false);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
}).single("videoFile");

const uploadVideo = (req, res, next) => {
  console.log("req.body is below");
  console.log(req.body);
  console.log("req.file is below");
  console.log(req.files);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err) {
        return res.send(err);
      }
    }

    next();
  });
};

const getResult = async (req, res, next) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  const images = req.body.images.map((image) => "" + image + "").join("");

  // return res.send(`Images were uploaded:${images}`);
  next();
};

module.exports = {
  uploadVideo,
  getResult,
};
