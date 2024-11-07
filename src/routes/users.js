const express = require('express');

const router = express.Router();
const UserController =  require("../controller/userController.js")


router.get("/",UserController.getAllUser)

// CREATE - POST DATA
router.post("/",UserController.CreateUser)
// UPDATE - PATCH DATA

router.patch("/:id",UserController.UpdateUser)

module.exports = router
