const createFolder = require("../utils/folderHandler");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let reqPath = req.originalUrl.split("/")[1];
    let path = `./uploads/${reqPath}`;
    createFolder(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadToDiskStorage = multer({ storage });

module.exports = uploadToDiskStorage;
