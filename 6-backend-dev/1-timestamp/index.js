// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (req, res) => {
  const date = getDate("now");
    res.json({
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString()
  });
})

app.get("/api/:date", (req, res) => {
  console.log(req.params.date)
  const date = getDate(req.params.date)
  console.log(date)
  if (!isNaN(date.valueOf())) {
    res.json({
    unix: Math.floor(date.getTime()),
    utc: date.toUTCString(),
    });
  } else {
    res.json({
      error: 'Invalid Date'
    })
  }

});

const getDate = (date) => {
  if (date === "now") {
    date = new Date()
  } else if (/^\d+$/.test(date)) {
    date = new Date(parseInt(date))
  } else {
    date = new Date(date)
  }
  return date
}


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
