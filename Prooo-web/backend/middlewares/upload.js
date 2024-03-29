const multer = require("multer");
const sharp = require("sharp");
const helpers = require("../helpers/helpers");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("images", 10);

const uploadImages = (req, res, next) => {
  console.log("req.body is below");
  console.log(req.body);
  console.log("req.files is below");
  console.log(req.files);
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        console.log(err);
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  let userId = req.user._id;
  let getMilliseconds = helpers.getMilliseconds();

  req.body.images = [];
  let looper = 1;
  await Promise.all(
    req.files.map(async (file) => {
      // const filename = file.originalname.replace(/\..+$/, "");
      // const newFilename = `${userId}-${getMilliseconds}-${looper++}${Date.now()}.png`;

      // await sharp(file.buffer)
      //   .toFormat("png")
      //   .png({ quality: 5 })
      //   .toFile(`./pictures/images/${newFilename}`);

      console.log(file);
      let fileSource = file;
      let fileName = fileSource.mimetype;
      let splitFileName = fileName.split("/");
      let extension = splitFileName[splitFileName.length - 1];

      console.log("extension --> " + extension);

      // await sharp(file.buffer)
      //   .png({ quality: 10 }) // Range should be B/W 0-100
      //   .toFile(`./pictures/images/${newFilename}`);

      const newFilename = `${userId}-${getMilliseconds}-${looper++}${Date.now()}.${extension}`;

      await sharp(file.buffer).toFile(`./pictures/images/${newFilename}`);

      req.body.images.push(newFilename);
    })
  ).catch((err) => {
    console.log("Something went wrong in resizeImages func");
    console.log(err);
  });

  next();
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
  uploadImages,
  resizeImages,
  getResult,
};
