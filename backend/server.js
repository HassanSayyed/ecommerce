const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const userRoute = require("./routers/user")

const app = express();
const port = 5000;

dotenv.config();

app.use("/api/user" , userRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(
        () => console.log(" DB conn Sucsess")
    )
    .catch (
        (err) => console.log(err)
    )

app.get('/', (req, res) => res.send('Hello World!'))





app.listen(port || process.env.PORT , () => console.log(`Example app listening on port ${port}!`))