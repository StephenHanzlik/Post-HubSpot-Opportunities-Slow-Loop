//JSON configuration is currently hard coded to post to staging.  You will need to add the prompted fields.

const requestPromise = require('request-promise-native');
const prompt = require('prompt');

prompt.start();
prompt.get(['Iterations (< 500)'], function (err, result) {
  const iterations = `${result['Iterations (< 500)']}`;
  const authHeader = "User <User_Token>, Organization <Org_Token>, Element <Element_Token>";
  const apiUrl =  "https://api.cloud-elements.com/elements/api-v2/case";

  console.log(`POST to /case ${iterations} times`);
  console.log(`Using Authorization Header: ${authHeader}`);
  let succesCounter = 0;
  let failedCounter = 0;

  const postOpportunities = function (runCounter) {
    const options =  {
      'method': 'POST',
      'headers': {
        'Authorization': authHeader,
        'accept': 'application/json'
      },
      'json': true,
      'url': apiUrl,
      'body': {
        "OwnerId": "005i0000001VNdeAAG"
      }
    };
    requestPromise(options)
    .then(function (response) {
      succesCounter++;
      console.log(`${succesCounter} successful POSTs to /case`);
    })
    .catch(function (err) {
      failedCounter++
      console.log(`ERROR: ${err}`);
      console.log(`${failedCounter} failed`);
    });
  }

  if(iterations < 500){
      function slowLoop( count, interval, callback ) {
        var i = 0;
        next();
        function next() {
          if( callback( i ) !== false ) {
              if( ++i < count ) {
                  setTimeout( next, interval );
              }
          }
        }
      }
      slowLoop(iterations, 1, function( i ) {
          postOpportunities()
      });
  } else {
    console.log("ERROR: Please enter an interation number less then 500")
  }
});
