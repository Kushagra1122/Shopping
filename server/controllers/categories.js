
const categoryData = require("../model/categories");

const create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const existingCategory = await categoryData.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({

                error: "Category Already Exisits",
            });
        }
        const category = await new categoryData({
            name,

        }).save();
        res.status(200).json({
            message: "new category created",
            category,
        });

    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryData.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );
        res.status(200).json({
            success: true,
            messsage: "Category Updated Successfully",
            category,
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const getall = async (req, res) => {
    try {
        const category = await categoryData.find({});
        res.status(200).json({
            success: true,
            message: "All Categories List",
            category,
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const get = async (req, res) => {
    try {
        const { id } = req.params
         const category = await categoryData.findById(id);
        res.status(200).json({
            success: true,
            message: "Get SIngle Category SUccessfully",
            category,
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}
const dlt = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryData.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Categry Deleted Successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
module.exports = { create, update, getall, get, dlt }