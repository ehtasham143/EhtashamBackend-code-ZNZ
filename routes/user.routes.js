const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  Register,
  setPass,
  Login,
  getAllData,
} = require("../controller/user.controller"); //destructing first
const router = express.Router();
router.post("/userRegister", Register);
router.put("/setPass/:email/:rememberToken", setPass);
router.post("/Login", Login);
router.get("/getAllData", verifyToken, getAllData); // verify JWT to get all the data
//router.post("/uploadFile",uploadFile)

module.exports = router;
