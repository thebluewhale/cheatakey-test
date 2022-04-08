const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

require("./config/environment");
const db = require("./database");

const routes = require("./routes/index");

const assetFolder = path.resolve(__dirname, "../dist/");
const port = process.env.PORT;
const app = express();

app.use(express.static(assetFolder));
app.use(bodyParser.json());

app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
