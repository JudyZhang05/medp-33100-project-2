var express = require('express');
var router = express.Router();
const fs = require('fs');

const API_URL = 'https://data.cityofnewyork.us/resource/vjbm-hsyr.json';
let parksName = []
let parkTrails = {}
let level = {}

//fetching API
fetch(API_URL)
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        data.forEach((trail) => {   //Getting the amount of trail difficulties in each park 
            if (!parksName.includes(trail.park_name) && trail.park_name != undefined){
                parksName.push(trail.park_name)
                parkTrails[trail.park_name] = {1:0,2:0,3:0,4:0};
            }
            if(trail.park_name != undefined && trail.difficulty != undefined){
                if(!level.hasOwnProperty(trail.difficulty.slice(0, 1))){    //collecting all the different difficulties
                    level[trail.difficulty.slice(0, 1)] = trail.difficulty.slice(3)
                }
                parkTrails[trail.park_name][trail.difficulty.slice(0, 1)] +=1
            }
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });

router.get('/', (req,res,next) => {
    res.render('trails', {trails: parkTrails, trails_difficulty: level})
});

module.exports = router;
