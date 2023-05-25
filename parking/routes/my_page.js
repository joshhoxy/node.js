var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/my_page', function(req, res, next) {
  res.render('my_page', { title: 'Express' });
});

module.exports = router;
