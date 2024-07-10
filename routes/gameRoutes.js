const express = require("express");
const router = express.Router();
const { addGame, removeGame, getAllGames } = require("../controllers/gameController");
const auth = require("../middleware/auth");
const authorizeOnlyEmail = require("../middleware/authorizeOnlyEmail");

router.post('/addgame', auth, authorizeOnlyEmail(process.env.EMAIL_ADDRESS), addGame);
router.post('/removegame', auth, authorizeOnlyEmail(process.env.EMAIL_ADDRESS), removeGame);
router.get('/allgames', getAllGames);

module.exports = router;
