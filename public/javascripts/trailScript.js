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
// const showBarGraph = document.querySelector('.difficulty-bar-graph')

function countTrails(){
    let numberOfTrails = 0;
    
}

function setUp(){
    titleEl.innerHTML = selectedPark;
    parkTitle.innerHTML = selectedPark;
}
setUp()

function plotBarGraph(){
    let parkIndex = parkName.indexOf(selectedPark);
    console.log(parkTrails[parkIndex])
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
        // width: 700,  
        // height: 700,  
        // margin: {l:20, r:20, t:100, b:20},
        barcornerradius: 15,
    };

    Plotly.newPlot('bar-graph', data, layout, {responsive: true});
}
plotBarGraph()