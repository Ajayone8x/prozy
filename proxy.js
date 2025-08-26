// proxy.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const url = req.query.url; // Example: /proxy?url=https://example.com/stream.m3u8

  if (!url) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });

    // Copy headers from source
    res.set("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error: " + err.message);
  }
});

// Render will use this port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
