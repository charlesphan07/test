var express    = require('express');
var app        = express(); 
var path = require('path');


app.use(express.static(__dirname + /public)); 

var port = process.env.PORT || 8080;

var fonctions = require('./scripts/fonctions.js');

var Message = 'Partie 2';
// --------------------
// ROUTES D'API
// --------------------
var router = express.Router();

// Routeur qui reçoit tous les messages et les route à l'endroit approprié
router.use(function(req, res, next) 
{    next(); // Continue à la route
});


// Route de test, sur /api
router.get('/', function(req, res) {
    res.json({ message: 'Bienvenue sur l\'API de CP'});   
});

// Route pour lire le message, sur /api/message
router.get('/message', function(req, res) {
    res.json({ message: Message});   
});

// Route pour modifier le message, sur /api/message/msgModifie
router.route("/message/msgModifie")
    .put(function(req, res) {
        Message = req.body.message;
            res.json({ message: 'Message modifié!' });
});


// FIN DES ROUTES

//Enregistre les routes d'API pour qu'elles soient accessibles sur /api
app.use('/api', router);

// Page Angular de présentation des messages
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

// Démarre le serveur
app.listen(port);
console.log('Serveur démarré sur le port ' + port);
