var express = require('express');
var router = express.Router();
const fs = require('fs');
const API_URL = "https://data.cityofnewyork.us/resource/vjbm-hsyr.json";

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  //fetching API
  fs.readFile(API_URL,'utf8',(err, data) => {
    if (err){
      res.status(500).send('Something went wrong');
      return;
    }
    res.render('index',{})
  });
});

module.exports = router;

