var express = require('express');
var router = express.Router();
const fs = require('fs');

const API_URL = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json';

router.get('/', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello World!')
    return;
});

//fetching API
fetch(API_URL)
    .then(res => {
        console.log('test', res)
        if (!res.ok) {
        throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

module.exports = router;
