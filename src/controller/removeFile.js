const aws = require("aws-sdk");
const s3 = new aws.S3();

exports.removeFile = (key) => {
  return new Promise(function (resolve, reject) {
    s3.deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    })
      .promise()
      .then((response) => {
        console.log(response.status);
      })
      .catch((response) => {
        console.log(response.status);
      });
  });
}
