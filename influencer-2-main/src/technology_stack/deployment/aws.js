const AWS = require('aws-sdk');
<<<<<<< HEAD
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
=======

// Configure AWS
AWS.config.update({
  region: 'us-east-1',
  // other configuration parameters
});

// S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
function uploadFile(bucketName, key, fileContent) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent
  };
  return s3.upload(params).promise();
}

// Function to download a file from S3
function downloadFile(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return s3.getObject(params).promise();
}

// Function to delete a file from S3
function deleteFile(bucketName, key) {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return s3.deleteObject(params).promise();
}

// Function to list files in a bucket
function listFiles(bucketName) {
  const params = {
    Bucket: bucketName
  };
  return s3.listObjectsV2(params).promise();
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  listFiles
>>>>>>> ac62b9b (Initial commit)
};