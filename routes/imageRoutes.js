const express = require("express");
const router = express.Router();
const { uploadImages, handleUpload } = require("../controllers/imageController");

router.post("/upload", uploadImages, handleUpload);

module.exports = router;
