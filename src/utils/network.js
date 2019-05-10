function GetRequest(url, cb) {
  var xhttp = new XMLHttpRequest();
  // xhttp.withCredentials = true;
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4)
     cb(this);
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function PostRequest(url, params, cb){
  var xhttp = new XMLHttpRequest();
  // xhttp.withCredentials = true;
  var data = JSON.stringify(params);
  xhttp.open("POST", url, true);
  xhttp.onreadystatechange = function(){
    if(this.readyState === 4) cb(this);
  }
  xhttp.send(data);
}
//commented withcredentials to use herokuapp.
module.exports = {
  PostRequest,
  GetRequest,
};
