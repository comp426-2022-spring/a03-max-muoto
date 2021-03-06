const express = require('express');
const minimist = require('minimist');

const app = express()
const argv = (minimist)(process.argv.slice(2));

argv["port"];
const HTTP_PORT = argv.port || 5000;

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});




// Define Check Endpoints
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


app.get('/app/flip/', (req, res) => {
    flip_result = coinFlip();
    res.status(200).json({"flip" : flip_result});
});

app.get('/app/flips/:number', (req, res) => {
    amt = req.params.number
    coin_flips = coinFlips(amt)
    flips_counted = countFlips(coin_flips)
    res.status(200).json({"raw" : coin_flips, "summary" : flips_counted});

});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json({"result" : flipACoin("heads")});
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json({"result" : flipACoin("tails")});
});



// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});


function coinFlip() {
    let rand = Math.floor(Math.random() * 2);
    if (rand == 1) {
      return "heads";
    } else {
      return "tails";
    }
  }
  
  
  function coinFlips(flips) {
    let result = [];
    for (let i = 0; i < flips; i++) {
      result.push(coinFlip());
    }
    return result;
  }
  
  
  function countFlips(array) {
    let num_tails = 0;
    let num_heads = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        num_heads += 1;
      } else {
        num_tails += 1;
      }
    }
    if (num_heads == 0) {
      return {
        tails: num_tails
      };
    }
    if (num_tails == 0) {
      return {
        heads: num_heads,
      };
    }
    return {
      heads: num_heads,
      tails: num_tails
    };
  }
  
  
  function flipACoin(call) {
    let coin  = coinFlip();
    if (coin == call) {
      return {
        call: call,
        flip: coin,
        result: "win"
      };
    } else {
      return {
        call: call,
        flip: coin,
        result: "lose"
      };
    }
  }
  
  
