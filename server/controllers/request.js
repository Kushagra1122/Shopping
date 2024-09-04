const requestData = require("../model/request")
const userData = require("../model/user")
const request = async (req, res) => {
    try {

        const { id } = req.body
        const find =await userData.findById({_id:id})
        if (find){
            const check = await requestData.findOne({ id })
            if (check) {
                return res.status(400).json({
                    message: "A request is already sended ",
                    success: false
                })
            }
            await requestData.create({
                id,
                name:find.name,
                email:find.email,

            });
            return res.status(201).json({
                message: "Request sended successfully.",
                success: true
            })
        }
        

    } catch (error) {

    }
}
const get=async(req,res)=>{
    
        try {
            const requests = await requestData.find({});
            res.status(200).json({
                success: true,
                message: "All requests List",
                requests,
            });
        } catch (err) {
            res.status(400).json({ error: err })
       
        
    }
}
const dlt=async(req,res)=>{
    try {
        const{id}=req.params
        console.log(id)
        await requestData.findByIdAndDelete(id)

    } catch (error) {
        
    }
}
module.exports = {  request ,get,dlt}