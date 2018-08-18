var AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});

var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

var params = { TableName:"stories", ProjectionExpression: "story" };

scan = function(cb) {
  ddb.scan(params,function(err,result) {
    if(err) { console.log(err); }
    else {
      console.log("got results!")
      console.log(result);
      cb(result.Items);
    }
  });
}

scan(console.log)
