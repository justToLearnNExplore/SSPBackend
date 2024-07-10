const express = require("express");
const router = express.Router();
const { raiseEnquiry } = require("../controllers/enquiryController");
const auth = require("../middleware/auth");

router.post('/raise-enquiry', auth, raiseEnquiry);

module.exports = router;
