//JSON configuration is currently hard coded to post to staging.  You will need to add the prompted fields.

const requestPromise = require('request-promise-native');
const prompt = require('prompt');

prompt.start();
prompt.get(['Iterations (< 500)'], function (err, result) {
  //const elementKey = "MhRU4yMJ0GvphVdugjvEkJKXmxgnv90XwW2hFeJqGrU="
  const iterations = `${result['Iterations (< 500)']}`;
  const authHeader = "User cD8xoBAixe+KZoQQqdSUWAtmi2bugDD1fwuQ3BI7V7I=, Organization afa1203433d54b98eb91931b75abc83e, Element P6EBzzR+YsnPt2hDmyoELy3P4LyHy75Twf6bkefd5G4=";
  const apiUrl =  "https://staging.cloud-elements.com/elements/api-v2/opportunities";

  console.log(`POST to /opportunities ${iterations} times`);
  console.log(`Using Authorization Header: ${authHeader}`);
  let succesCounter = 0;
  let failedCounter = 0;

  if(iterations < 500){

      for (var i = 0; i <= iterations; ++i) {
        (function(n) {
          setTimeout(function(){

            const options =  {
              'method': 'POST',
              'headers': {
                'Authorization': authHeader,
                'accept': 'application/json'
              },
              'json': true,
              'url': apiUrl,
            'body': {
                "properties": {
                  "dealname": "The New Deal",
                  "amount": "350"
                }
              }
            };
            requestPromise(options)
            .then(function (response) {
              succesCounter++;
              console.log(`${succesCounter} successful POSTs to /opportunities`);
            })
            .catch(function (err) {
              failedCounter++
              console.log(`ERROR: ${err}`);
              console.log(`${failedCounter} failed`)
            });


          }, 1000);
        }(i));
      }
            //
            // const options =  {
            //   'method': 'POST',
            //   'headers': {
            //     'Authorization': authHeader,
            //     'accept': 'application/json'
            //   },
            //   'json': true,
            //   'url': apiUrl,
            // 'body': {
            //     "properties": {
            //       "dealname": "The New Deal",
            //       "amount": "350"
            //     }
            //   }
            // };
            // requestPromise(options)
            // .then(function (response) {
            //   succesCounter++;
            //   console.log(`${succesCounter} successful POSTs to /opportunities`);
            // })
            // .catch(function (err) {
            //   failedCounter++
            //   console.log(`ERROR: ${err}`);
            //   console.log(`${failedCounter} failed`)
            // });

  } else {
    console.log("ERROR: Please enter an interation number less then 500")
  }
});
