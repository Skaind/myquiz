var express = require('express');
var router = express.Router();

var quizController = require( '../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

// Definicion de rutas de /quizes
router.get( '/quizes',						quizController.index);
router.get( '/quizes/:quizId(\\d+)', 		quizController.show);
router.get( '/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
  res.render('author', { creditos: 'Proyecto creado por Dani Ramos' });
});

module.exports = router;
