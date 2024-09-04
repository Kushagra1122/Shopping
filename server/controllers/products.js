
const productData = require("../model/products");
const create = async (req, res) => {
    try {

        const { name, category, price, photo, stock, min,description } = req.body

        const check = await productData.findOne({ name })

        if (check) {
            return response.status(400).json({
                message: "Already exits",
                error: true,
            })
        }


        const product = await new productData({
            name,
            category,
            price,
            photo,
            stock,
            min,
            description

        }).save();

        return res.status(201).json({
            message: "Product created successfully",
            data: product,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}
const update = async (req, res) => {
    try {
        const { name, category, photo, price, stock, min,description } = req.body;
        const { id } = req.params;

        const product = await productData.findByIdAndUpdate(
            id,
            {
                name,
                category,
                price,
                photo,
                stock,
                min,
                description,

            },
            { new: true }
        );
        res.status(200).json({
            success: true,
            messsage: "Product Updated Successfully",
            product,
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const getall = async (req, res) => {
    try {
        const product = await productData.find({});
        res.status(200).json({
            success: true,
            message: "All Products List",
            product,
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const get = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await productData.findById(id);
        res.status(200).json({
            success: true,
            message: "Get SIngle Product SUccessfully",
            product,
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}
const dlt = async (req, res) => {
    try {
        const { id } = req.params;
        await productData.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const filter = async (req, res) => {
    const { category } = req.body
    const find = await productData.find({ category })


    res.status(200).json({
        filter: find,

    })



}
module.exports = { create, update, dlt, get, getall, filter }