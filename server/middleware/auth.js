const userData = require("../model/user");
const JWT = require("jsonwebtoken")

const requireSignIn = async (req, res, next) => {
    try {
      
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};
const Admin = async (req, res, next) => {
    try {

        const user = await userData.findById(req.user._id);
        console.log(user)
        if (user.type!=='admin') {
            return res.status(400).json({

                error: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};
const Seller = async (req, res, next) => {
    try {

        const user = await userData.findById(req.user._id);
        console.log(user)
        if (user.type == 'buyer') {
            return res.status(400).json({

                error: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};


module.exports = { requireSignIn, Admin,Seller }