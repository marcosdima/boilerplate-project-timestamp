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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  // Checks if the date can be parsed as an integer... (date in miliseconds)
  if (Number.isInteger(Number(dateInput))) dateInput = parseInt(dateInput);

  // Check if dateInput its indeterminated... (Empty string case)
  let date;
  if (dateInput) date = new Date(dateInput);
  else date = new Date();

  // Checks if the date is valid...
  if (isNaN(date.getTime())) return res.json({ error : "Invalid Date" });

  const formattedDate = date.toUTCString();
  
  res.json({
    unix: date.getTime(),
    utc: formattedDate
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});