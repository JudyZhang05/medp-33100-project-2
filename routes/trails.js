var express = require('express');
var router = express.Router();
const fs = require('fs');

const API_URL = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json';
let parksName = []
let parks = []

//fetching API
fetch(API_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        // console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });

router.get('/', (req,res,next) => {
    res.render('trails', {parks: parks})
});

module.exports = router;
