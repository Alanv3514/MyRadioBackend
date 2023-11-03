require("dotenv").config()
const express = require('express');
const router = require("./src/Routes/index.js");
const {swaggerDocs: v1SwaggerDocs} = require("./src/Controller/swaggerController.js");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
const START = (port) => {
    app.use("/api", router);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    v1SwaggerDocs(app, port);
    return app;
}
module.exports = START;