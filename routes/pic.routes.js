const express = require("express");
const router = express.Router();
const picModel = require("../model/picModel");
const { uploadpic } = require("../controller/picUpload.controller");
const upload = require("../middleware/multer/multer");

const { cloudinaryImg } = require("../controller/picUpload.controller"); //destructing first
router.post("/cloudinaryImg", upload.single("pic"), cloudinaryImg);

module.exports = router;
