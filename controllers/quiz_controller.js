var models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next (new Error('No existe quizId=' + quizId));}
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res)
{
  var search = (req.query.search || '').trim();
  var options = {};
  var search_where = '';

  if (search !== '')
  {
    search_where = '%' + search.replace(' ', '%') +'%';
    options = {where: ['pregunta LIKE ?', search_where], order: 'pregunta ASC'};
  }

  models.Quiz.findAll(options).then(function(quizes)
  {
    res.render('quizes/index', { quizes: quizes , search: search , errors: [] });
  });
}

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
