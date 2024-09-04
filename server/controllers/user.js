const userData = require("../model/user")

const bcrypt = require("bcrypt")


const JWT = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const user = await userData.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);



        await userData.create({
            name,
            email,
            password: hashedPassword,

        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };


        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                cart: user.cart,
                favourite: user.favourite,
                address:user.address,
                pincode:user.pincode,
               
            },

            token,



        });

    } catch (error) {
        console.log(error);
    }
}
const get = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userData.findById(id);
        res.status(200).json({
           
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                cart: user.cart,
                favourite: user.favourite,
                address: user.address,
                pincode: user.pincode,

            },
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
}
const getall = async (req, res) => {
    try {
        const user = await userData.find({});
        res.status(200).json({
            success: true,

            user,
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
const remove = async (req, res) => {
    try {
        const { id } = req.params
        await userData.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User Removed Successfully",
        });
    } catch (err) {
        res.status(400).json({ error: err })
    }

}
const makeSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userData.findByIdAndUpdate(
            id,
            { type: "seller" },
            { new: true }
        );
        
        res.status(200).json({
            success: true,
            messsage: "Updated Successfully",
            user,
        });
    } catch (error) {

    }
}
const RemoveSeller = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userData.findByIdAndUpdate(
            id,
            { type: "buyer" },
            { new: true }
        );
        res.status(200).json({
            success: true,
            messsage: "Updated Successfully",
            user,
        });
    } catch (error) {

    }
}
const user=async(req,res)=>{
    try {
        
        const user=await userData.findById(req.user)
        res.status(200).json({
            user,
        })
    } catch (error) {
        
    }
}

module.exports = { register, login, getall, makeSeller, remove,RemoveSeller,user,get }