const express = require('express');
const app = express();
const port = 5000;

const mongoose = require("mongoose");

app.get('/', (req, res) => res.send('Hello World!'))





app.listen(port || process.env.PORT , () => console.log(`Example app listening on port ${port}!`))