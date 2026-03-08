# URL Shortener Microservice

Ein simples Node.js/Express-Backend zum Kürzen und Validieren von URLs. Gebaut für das freeCodeCamp "Back End Development and APIs" Zertifikat.

## Tech Stack
Node.js, Express.js, native DNS-Validierung.

## API-Routen
* **POST `/api/shorturl`**: Nimmt eine URL (`url=...`) an, prüft sie auf Erreichbarkeit und gibt eine Short-ID zurück.
* **GET `/api/shorturl/:id`**: Leitet direkt zur originalen URL weiter.

## Lokales Setup
```bash
npm install
npm start
