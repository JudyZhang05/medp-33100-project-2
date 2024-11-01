var express = require('express');
var router = express.Router();
const fs = require('fs');

const API_URL = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json';
const trail_data = ''

//fetching API
fetch(API_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        trail_data = data;
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {trails: trail_data});
});

module.exports = router;

