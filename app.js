require("dotenv").config();
require('express');
const mongoose = require('mongoose');
const START = require("./server.js");
const PORT = process.env.PORT;
const URL = process.env.DB_URL;
// const DBNAME =process.env.DB_NAME;

const init = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await START(PORT);
    } catch (error) {
        console.log(error);
    }
}
init()