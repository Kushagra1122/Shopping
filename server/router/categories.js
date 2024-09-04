const express = require("express")
const { requireSignIn, Admin, Seller } = require("../middleware/auth")
const { create, update, getall, get, dlt } = require("../controllers/categories")

const router = express.Router()
router.post("/create", requireSignIn, Seller, create)
router.put("/update/:id", requireSignIn, Seller, update)
router.get("/getall", getall)
router.get("/get/:id", get)
router.delete("/delete/:id", requireSignIn, Seller, dlt)
module.exports = router