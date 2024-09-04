const mongoose = require("mongoose");

const { Schema } = mongoose;
const categoryDataSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

});

const categoryData = mongoose.model("Category", categoryDataSchema);

module.exports = categoryData;
