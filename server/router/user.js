const express = require("express")
const { register, login, getall, remove,  removeAdmin,  makeSeller, RemoveSeller, user, get } = require("../controllers/user")
const { requireSignIn, Admin } = require("../middleware/auth");





const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get('/getall', getall)
router.get("/get/:id", get)
router.delete('/dlt/:id', requireSignIn, Admin, remove)
router.put('/makeSeller/:id', requireSignIn, Admin, makeSeller)
router.put('/removeSeller/:id', requireSignIn, Admin, RemoveSeller)
router.get('/session',requireSignIn,user)




module.exports = router;