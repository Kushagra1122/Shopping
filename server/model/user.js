const mongoose = require("mongoose");
const { Schema } = mongoose;
const userModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
            default: "buyer",
        },
        
     
        cart: [{
            type: mongoose.ObjectId,
            ref: "Product",

        }],
        favourite: [{
            type: mongoose.ObjectId,
            ref: "Product",

        }],
        address:{
            type:String,
        },
          pincode: {
            type:Number,
        }
        
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("userData", userModel);
