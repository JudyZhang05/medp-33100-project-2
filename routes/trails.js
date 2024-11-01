var express = require('express');
var router = express.Router();
const fs = require('fs');

const API_URL = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json';
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
        data.forEach((trail) => {   //Getting all the various parks from the api
            if (!parks.includes(trail.park_name) && trail.park_name != undefined){
                parks.push(trail.park_name)
            };
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

router.get('/', (req,res,next) => {
    res.render('trails', {trails: parks})
});

module.exports = router;
