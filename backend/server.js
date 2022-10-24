const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");

const userRoute = require("./routers/user");
const authRoute = require("./routers/auth");
const productRoute = require("./routers/product");
const orderRoute = require("./routers/order");
const cartRoute = require("./routers/cart");


const app = express();
app.use(express.json())

dotenv.config();

app.use("/api/user" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/products" , productRoute);
app.use("/api/orders" , orderRoute);
app.use("/api/cart" , cartRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(
        () => console.log(" DB conn Sucsess")
    )
    .catch (
        (err) => console.log(err)
    )

app.get('/', (req, res) => res.send('Hello World!'))





app.listen(5000 || process.env.PORT , () => console.log(`Example app listening on port ${process.env.PORT || 5000}!`))