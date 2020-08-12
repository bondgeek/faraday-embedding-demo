import Koa = require("koa");
import fs from "fs";

import { signFaradayAuthToken } from "./faraday-auth";

const app = new Koa();

const privateKey = fs.readFileSync("./acme-demo.key");

app.use(async (ctx) => {
  const token = signFaradayAuthToken({
    issuer: "https://acme.example.com/",
    privateKey,
    accountId: "8bfac1e5-6f2a-4d58-83bf-9d8b4000a2b0",
  });

  ctx.body = `<!DOCTYPE html>
<html>
  <head>
    <title>Embedded Faraday Demo</title>
    <style>
      html { height: 100%; }
      body { height: 100%; margin: 0; display: grid; grid-template-rows: 50px 1fr; }
      h1 { padding: 4px; margin: 0; font-size: 32px; }
      iframe { width: 100%; height: 100%; border-width: 0; }
    </style>
  </head>
  <body>
    <h1>Embedded Faraday Demo</h1>
    <iframe src="https://embed.faraday.io/#fdy_token=${token}"></iframe>
  </body>
</html>`;
});

const PORT = 3000;
console.log(`Serving on http://localhost:${PORT}/`);
app.listen(PORT);
