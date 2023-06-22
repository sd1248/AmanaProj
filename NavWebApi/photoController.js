//photoController.js

// const aws = require('aws-sdk');
// const config = require('./awsConfig.json');
//
// (async function() {
//   try {
//
//     aws.config.setPromisesDependency();
//     aws.config.update({
//       accessKeyId: config.aws.accessKey,
//       secretAccessKey: config.aws.secretKey,
//       region: 'ap-southeast-1',
//       bucket: 'org.amanaministries.blr.s3'
//     });
//
//     const s3 = new aws.S3();
//     const response = await s3.listObjectsV2()({
//       Bucket: 'org.amanaministries.blr.s3'
//     }).promise();
//
//     console.log(response);
//   } catch(e) {
//     console.log('Error:', e);
//   }
// })();
