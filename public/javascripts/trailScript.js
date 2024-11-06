//URGENT -> GRAPH (plotly)

//Obtain selected park
let selectedPark = ''
if(typeof(localStorage) !== 'undefined'){
    selectedPark = localStorage.getItem('park')
}else{
    selectedPark = 'Goodhue Park'
}


const titleEl = document.querySelector('title');
const parkTitle = document.querySelector('.park-information h1');
const showDifficulty = document.querySelector('.show-difficulty');
let otherParks = document.querySelectorAll('.change-park div');
let newParkName = []
let parkIndex = -1;


function countTrails(){ //count the number of trails in one park
    let numberOfTrails = 0;
    for (num of parkTrails[parkIndex]){
        numberOfTrails += num;
    }
}

function decodeHtml() { //ridding parkName list of HTML entities returns new list of parkNames
    let textArea = document.createElement('textarea');
    for (park of parkName){
        textArea.innerHTML = park;
        newParkName.push(textArea.value.toString())
    }
    parkIndex = newParkName.indexOf(selectedPark)
    if(parkIndex === -1){
        parkIndex = parkName.indexOf(selectedPark)
    }
}

function setUp(){
    titleEl.innerHTML = selectedPark;
    parkTitle.innerHTML = selectedPark;

    plotBarGraph()
    decodeHtml()
}

function plotBarGraph(){    //display bar graph
    let trace1 = {
        x: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
        y: parkTrails[parkIndex],
        marker:{
          color: ['#067600', '#FFD015', '#FF8341', '#FF3F3F']
        },
        type: 'bar'
      };
      
    let data = [trace1];
    
    let layout = {
        title: `${selectedPark}'s Trail Difficulty`,
        xaxis: {title: 'Difficulty'},
        yaxis: {title: 'Quantity'},
        paper_bgcolor: '#FEFAE0',
        plot_bgcolor: '#FEFAE0',
        barcornerradius: 15,
    };

    Plotly.newPlot('bar-graph', data, layout, {responsive: true});

    countTrails()
}

otherParks.forEach((park) => {
    park.addEventListener('click', (event) => {
        selectedPark = event.target.innerText;
        setUp()
    })
})