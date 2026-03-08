require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

//** URL Shortener Microservice 
// MY CODE */ 
 
const urlDatabase = [];
let idCounter = 1;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  try {
    const url = new URL(originalUrl);
    dns.lookup(url.hostname, (err, address) => {
      if (!address || err) {
        return res.json({ error: 'invaild url' });
      }
    const short_url = idCounter;
    urlDatabase.push({
    original_url: originalUrl,
    short_url: short_url
  });
  idCounter++; 
  res.json({
    original_url: originalUrl,
    short_url: short_url
  });


    });
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url;
  const urlEntry = urlDatabase.find(entry => entry.short_url == shortUrl);
  if (urlEntry) {
    res.redirect(urlEntry.original_url);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});
//** END OF URL Shortener Microservice */

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
