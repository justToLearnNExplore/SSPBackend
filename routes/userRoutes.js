const express = require("express");
const router = express.Router();
const { signup, login, getUsers, deleteUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const authorizeOnlyEmail = require("../middleware/authorizeOnlyEmail");

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);  
router.delete('/users/:id', auth, authorizeOnlyEmail(process.env.EMAIL_ADDRESS), deleteUser);

module.exports = router;
