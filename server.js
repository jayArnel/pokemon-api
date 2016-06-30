var express = require('express');
var app = express();

app.use(express.static('static'));

var pages = {
   '/': '/index.html',
   '/play': '/play.html'
}

for (page in pages) {
   app.get(page, function (req, res) {
      res.sendFile( __dirname + pages[page] );
   });
}


var server = app.listen(9000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
