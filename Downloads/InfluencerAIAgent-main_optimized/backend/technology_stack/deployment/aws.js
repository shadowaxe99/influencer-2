const AWS = require('aws-sdk');

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
};