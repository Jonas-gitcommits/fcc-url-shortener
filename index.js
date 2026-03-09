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
// MY CODE: */ 
 
const urlDatabase = [];
let idCounter = 1;

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  try {
    const url = new URL(originalUrl);
    
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return res.json({ error: 'invalid url' });
    }
    dns.lookup(url.hostname, (err, address) => {
      if (!address || err) {
        return res.json({ error: 'invalid url' });
      }
    const shorturl = idCounter;
    urlDatabase.push({
    original_url: originalUrl,
    short_url: shorturl
  });
  idCounter++; 
  res.json({
    original_url: originalUrl,
    short_url: shorturl
  });


    });
  } catch (err) {
    return res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', function(req, res) {
  console.log("\n--- NEUER GET REQUEST ---");
  console.log("1. Angefragte ID (aus der URL):", req.params.short_url);
  console.log("Typ der angefragten ID:", typeof req.params.short_url);
  
  const shortUrlParam = parseInt(req.params.short_url);
  console.log("2. Umgewandelt in Zahl (Integer):", shortUrlParam);
  
  console.log("3. Aktueller Inhalt der Datenbank:", urlDatabase);
  
  const urlEntry = urlDatabase.find(entry => entry.short_url === shortUrlParam);
  console.log("4. Ergebnis der Suche (urlEntry):", urlEntry);
  
  if (urlEntry) {
    console.log("--> ERFOLG: Gefunden! Leite weiter zu:", urlEntry.original_url);
    res.redirect(urlEntry.original_url);
  } else {
    console.log("--> FEHLSCHLAG: Nichts gefunden! Sende JSON-Fehler.");
    res.json({ error: 'No short URL found for the given input' });
  }
});
//** END OF URL Shortener Microservice */

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
