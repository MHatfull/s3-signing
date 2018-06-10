'use strict';

var AWS = require('aws-sdk');

module.exports.hello = (event, context, callback) => {
  var s3 = new AWS.S3();
  console.log(event.body);
  var params = JSON.parse(event.body);
  var s3Params = {
    Bucket: 'stories.underlunchers.co.uk',
    Key:  params.name,
    ContentType: 'application/octet-stream',
    ACL: 'public-read',
  };

  var uploadURL = s3.getSignedUrl('putObject', s3Params);

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://game.underlunchers.co.uk'
    },
    body: JSON.stringify({ uploadURL: uploadURL }),
  })
}
