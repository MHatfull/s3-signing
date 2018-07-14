'use strict';

var AWS = require('aws-sdk');

module.exports.sign = (event, context, callback) => {
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

module.exports.updateDB = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event));
  var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

  var params = {
    TableName: 'stories',
    Item: {
      'story' : { S: event.Records[0].s3.object.key },
      'size' : { N: event.Records[0].s3.object.size.toString() }
    }
  };

  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}
