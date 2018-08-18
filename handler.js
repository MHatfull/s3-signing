'use strict';

var AWS = require('aws-sdk');

module.exports.updateDB = (event, context, callback) => {
  var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

  var params = {
    TableName: 'stories',
    Item: {
      'story' : { S: event.Records[0].s3.object.key.split('.')[0] },
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
