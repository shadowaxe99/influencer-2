const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
const uploadFile = (bucketName, key, fileContent) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent
  };
  return s3.upload(params).promise();
}

// Function to download a file from S3
const downloadFile = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return s3.getObject(params).promise();
}

// Function to delete a file from S3
const deleteFile = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  return s3.deleteObject(params).promise();
}

// Function to list files in a bucket
const listFiles = (bucketName) => {
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

// Example usage of uploadFile within the POST /api/profile endpoint
app.post('/api/profile', (req, res) => {
  const { image, ...profileData } = req.body;
  const newUserProfile = new UserProfile(profileData);
  newUserProfile.save()
    .then(profile => {
      // Assuming 'image' contains the file content and 'imageName' is the name of the file
      const imageName = `${profile._id}_profile_image`;
      uploadFile(process.env.AWS_BUCKET_NAME, imageName, image)
        .then(uploadResponse => {
          profile.imageURL = uploadResponse.Location;
          profile.save();
          res.json(profile);
        })
        .catch(uploadError => res.status(500).json({ error: uploadError.message }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
});