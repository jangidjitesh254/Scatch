require('dotenv').config();

const { setEngine } = require('crypto');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');


const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");
app.use(cookieParser());

app.use("/users" , usersRouter);
app.use("/owners" , ownersRouter);
app.use("/products" , productsRouter);
console.log("ENV:", process.env.NODE_ENV);

app.listen(3000);