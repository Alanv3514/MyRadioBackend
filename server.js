require("dotenv").config()
const express = require('express');
const router = require("./src/Routes/index.js")

const app = express();

app.use(express.json());

const START = (port) => {
    app.use("/api", router);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    return app;
}
module.exports = START;