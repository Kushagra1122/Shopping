const mongoose = require("mongoose");
const { Schema } = mongoose;
const requestModel = new Schema(
    {
        id: {
            type: mongoose.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("requestData", requestModel);
