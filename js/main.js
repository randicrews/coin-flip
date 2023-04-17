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
        document.getElementById("player").innerText = +document.getElementById("player").innerText + data.yourPoints
        document.getElementById("coinGods").innerText = +document.getElementById("coinGods").innerText + data.coinPoints
        document.getElementById("result").innerText = data.result
        document.getElementById("announce").innerText = data.win
        document.querySelector('img').src = `css/${data.result}.jpeg`
      } else {
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
}


