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
        data.forEach((trail) => {   //Getting all the various parks from the api
            if (!parksName.includes(trail.park_name) && trail.park_name != undefined){
                parksName.push(trail.park_name)
                parks.push({
                    'name': trail.park_name
                    ,'amount': 1
                });
            }else if(parksName.includes(trail.park_name) && trail.park_name != undefined){
                for (let i = 0; i < parks.length; i++){
                    if(parks[i]['name'] === trail.park_name){
                        parks[i]['amount'] += 1;
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

router.get('/', (req,res,next) => {
    res.render('trails', {parks: parks})
});

module.exports = router;
