const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileContent
  };

  s3.upload(params, function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const downloadFile = (fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName
  };

  s3.getObject(params, function(err, data) {
    if (err) console.error(err);
    fs.writeFileSync(fileName, data.Body.toString());
    console.log(`${fileName} has been downloaded successfully.`);
  });
};

module.exports = {
  uploadFile,
  downloadFile
};