var express = require('express');
var router = express.Router();
//var io = require('socket.io')(server);




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Achtung die Einh\u00F6rner',
      message: "Game on!"
  });
});

function GameServer(){
    this.kurves = [];
    this.powerups = [];
}

module.exports = router;
