const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('guess' in params){
      res.writeHead(200, {'Content-Type': 'application/json'});
      let guess = params['guess']
      // let uPoints = 0
      // let cPoints = 0
      function play(){
        let flip = function(){
          let randomNumber = Math.random();
              let coin = "start";
              if(randomNumber > .50){
                coin = "heads";
              }
              else if(randomNumber <= .50){
                coin = "tails";
              }
              return coin;
        }
        let coin = flip()
        if (guess === coin){
          console.log('winwinchickydindin')
          // uPoints += 1
          const objToJson = {
            guess: `${guess}`,
            result:`${coin}`,
            win: 'yes, you win!',
            yourPoints: 1,
            coinPoints: 0
          }
          res.end(JSON.stringify(objToJson));
        } else if (guess != coin){
          console.log(`${guess}`, 'guess')
          console.log(`${coin}`, 'coin')
          console.log('loser')
          // cPoints += 1
          const objToJson = {
            guess: `${guess}`,
            result:`${coin}`,
            win: 'no, you are a loser',
            yourPoints: 0,
            coinPoints: 1

          }
          res.end(JSON.stringify(objToJson));
        }
      }
      play()
    }//guess if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
