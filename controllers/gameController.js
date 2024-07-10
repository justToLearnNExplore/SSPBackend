const Game = require('../models/Game');

exports.addGame = async (req, res) => {
  let games = await Game.find({});
  let id = games.length > 0 ? games[games.length - 1].id + 1 : 1;

  const game = new Game({
    id: id,
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    images: req.body.images,
    price: req.body.price,
    players: req.body.players,
    age: req.body.age,
    lo: req.body.lo,
    youtubeLink: req.body.youtubeLink
  });

 

  await game.save();

 
  res.json({
    success: true,
    name: req.body.name,
  });
};

exports.removeGame = async (req, res) => {
  await Game.findOneAndDelete({ id: req.body.id });

  

  res.json({
    success: true,
    id: req.body.id,
    name: req.body.name
  });
};

exports.getAllGames = async (req, res) => {
  let games = await Game.find({});

  
  res.send(games);
};
