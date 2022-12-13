const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const MAX_SIZE_TWO_GIGABYTES = 2 * 1024 * 1024 * 1024;

const spacesEndpoint = new aws.Endpoint(process.env.S3_ENDPOINT);
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: spacesEndpoint,
});

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    metadata: (req, file, callBack) => {
      callBack(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const folderName = req.params.folderName
          ? `${req.params.folderName}/`
          : "";

        const fileName = `${folderName}${hash.toString("hex")}-${
          file.originalname
        }`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: MAX_SIZE_TWO_GIGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};
