const express = require("express")

const { requireSignIn, Admin} = require("../middleware/auth");
const { request ,get, dlt} = require("../controllers/request");





const router = express.Router();


router.post('/send', requireSignIn, request)
router.get('/get', requireSignIn,Admin,get)
router.delete('/dlt/:id', requireSignIn, Admin, dlt)
module.exports = router;