const express = require("express");
const router = express.Router();
const fileModel = require("../model/files");
const { uploadFile, updateStatus } = require("../controller/file.controller");
const upload = require("../middleware/multer/multer");
const { verifyAdmin } = require("../middleware/auth");

router.post("/uploadFile", upload.single("File"), uploadFile);

router.put("/updateStatus/:postId", verifyAdmin, updateStatus);

module.exports = router;
