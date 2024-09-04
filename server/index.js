const express = require("express")
const app=express()
const mongoose = require("mongoose")
const Route1 = require("./router/user")
const Route2 = require("./router/request")
const Route3 = require("./router/categories")
const Route4 = require("./router/products")

const cors = require("cors")
require("dotenv").config()

app.use(cors())



app.use(express.json())


app.use('/api/auth', Route1)
app.use('/api/request', Route2)

app.use('/api/category', Route3)
app.use('/api/product', Route4)


mongoose
    .connect(process.env.URI, {

    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Started at port ${port}`)
})