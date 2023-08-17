const run = require("./db");
run().catch((err) => console.error(err));
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello UDIT!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

