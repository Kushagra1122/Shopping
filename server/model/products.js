const mongoose = require("mongoose");

const { Schema } = mongoose;
const productDataSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
    },
    photo: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: true,
    },
    rating:[{
        type:Number
    }],
    review:[{
type:String
    }],
    purchase_price:{
type:Number
    },
  sale:{
    type:Number
  }
});

const productData = mongoose.model("Product", productDataSchema);

module.exports = productData;
