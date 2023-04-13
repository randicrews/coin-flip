document.getElementById("submit").onclick = makeReq;

function makeReq(){
  let guess = document.querySelector('input[name="sides"]:checked').value

  var request = new XMLHttpRequest();
  request.open('GET', '/api?guess='+guess, true);

  request.onload = function() {
      console.log("works")
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log(data)
        // let urScore = 0
        // let cScore = 0
        // document.getElementById("player").innerText = urScore
        // document.getElementById("coinGods").innerText = cScore
        // urScore += data.yourPoints
        // cScore += data.coinPoints
        document.getElementById("result").innerText = data.result
        document.getElementById("announce").innerText = data.win
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}


