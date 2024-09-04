const express = require("express")
const { requireSignIn, Admin } = require("../middleware/auth")
const { create, update, getall, get, dlt, filter } = require("../controllers/products")


const router = express.Router()
router.post("/create", requireSignIn, Admin, create)
router.put("/update/:id", requireSignIn, Admin, update)
router.get("/getall", getall)
router.get("/get/:id", get)
router.delete("/delete/:id", requireSignIn, Admin, dlt)
router.post("/filter", requireSignIn, filter)
module.exports = router