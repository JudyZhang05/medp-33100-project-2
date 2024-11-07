const sortMethod = document.querySelector('#sort-by');
const searchBar = document.querySelector('#search-bar');
const rarrow = document.querySelector('.right');
const larrow = document.querySelector('.left');

var clickedPark = '';
let searchOpt = false;
let searchParks = [];
let parkLoadFrom = 0;
let parkLoadTo = 6;

function sortQuantity(parkList){
    let parksQuantity = []
    for (let i = 0; i < parkList.length; i++){
        if(searchOpt === true && searchParks.includes(parkList[i])){    //searched parks list
            parksQuantity.push({
                'name': parkList[i]
                ,'amount': amount[i]
            })
        }else if(searchOpt === false){
            parksQuantity.push({
                'name': parkList[i]
                ,'amount': amount[i]
            });  
        }
    }
    parksQuantity.sort((a,b) => {   //sorts highest to lowest amount of trails
        if(sortMethod.value == "Ascending Quantity"){
            return b.amount-a.amount;
        }else{
            return a.amount-b.amount;
        }
    })
    loadParks(parksQuantity);
}

function sortParks(parkList){   //sorting methods
    (searchOpt === false) ? parkList = parks : parkList = searchParks;
    if(sortMethod.value === "Default"){
        loadParks(parkList)
    }else if(sortMethod.value === "Ascending Alphabet"){
        loadParks(parkList.toSorted())
    }else if(sortMethod.value === "Descending Alphabet"){
        loadParks(parkList.toSorted().reverse())
    }else if(sortMethod.value === "Ascending Quantity" || sortMethod.value === "Descending Quantity" ){
        sortQuantity(parkList)
    }
}

function setListCount(direct,parkList){
    if(direct === true){
        parkLoadFrom = 0;
        parkLoadTo = 6;
    }else{
        parkLoadTo = parkList.length;
        parkLoadFrom = parkList.length - 6;
    }
    
}

function loadParks(parkList){
    //update webpage to sorted method
    const container = document.querySelector(".park-information");
    container.innerHTML = '';

    if(parkLoadTo > parkList.length){
        parkLoadTo = parkList.length
    }else if(parkLoadFrom < 0){
        parkLoadFrom = 0;
    }

    for(let load = parkLoadFrom; load < parkLoadTo; load++){    //update only 6 at a time
        let pname = ''
        if(sortMethod.value == "Ascending Quantity" || sortMethod.value == "Descending Quantity"){
            pname = parkList[load].name; 
        }else{
            pname = parkList[load];
        }

        const boxDiv = document.createElement('div');
        boxDiv.classList.add('container');
        
        const imgDiv = document.createElement('img');
        imgDiv.classList.add('park-image');

        imgDiv.src = `/images/${pname.toString().toLowerCase().split(' ').join('_').split('&#x27;s').join('s')}.jpg`

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('park-name');

        const nameH = document.createElement('h3');
        const descP = document.createElement('p');
        descP.innerText = "Learn more"

        nameH.innerHTML = pname

        container.appendChild(boxDiv);
        boxDiv.appendChild(imgDiv);
        boxDiv.appendChild(nameDiv);
        nameDiv.appendChild(nameH);
        nameDiv.appendChild(descP);
    }
}

//Get clicked park 
let allParks = document.querySelectorAll('.park-information');
allParks.forEach((parkTrail) => {
    parkTrail.addEventListener('click', (event) => {
        clickedPark = event.target.parentElement.innerHTML.split('h3>')[1].slice(0,-2);
        localStorage.setItem('park', clickedPark);
        window.location.href = "./trails";
    })
})

//Sorting method selection options
sortMethod.addEventListener('click', () => {
    sortMethod.addEventListener('change', () => {
        if(searchOpt === true){
            sortParks(searchParks)
            setListCount(true, searchParks)
        }else{
            sortParks(parks);
            setListCount(true, parks)
        }
    })
});


//Search method
searchBar.addEventListener('click', () => {
    searchBar.addEventListener('keydown',(event) => {
        setListCount(true, searchParks)
        if(searchBar.value.length > 0 && event.key === "Enter"){
            searchOpt = true;
            searchParks = []
            parks.forEach((parkName) => {
                if(parkName.toLowerCase().includes(searchBar.value.toLowerCase())){ //makes list of searched parks
                    searchParks.push([parkName])
                }
            })
            sortParks(searchParks)
        }
    })
});
searchBar.addEventListener('change', () => {
    if (searchBar.value.length === 0){   //resets searched parks
        searchOpt = false;
        searchParks = parks; 
        sortParks(searchParks)
    }
});

//right arrow
rarrow.addEventListener('click', () => {
    parkLoadFrom+=6;
    parkLoadTo+=6;
    
    if(searchOpt === true){
        if(parkLoadTo-2 > searchParks.length){
            setListCount(true,searchParks)
        }
        sortParks(searchParks)
    }else{
        if(parkLoadTo-2 > parks.length){
            setListCount(true,parks)
        }
        sortParks(parks)
    }
});

//left arrow
larrow.addEventListener('click', () => {
    parkLoadFrom-=6;
    parkLoadTo-=6;

    if(searchOpt === true){
        if(parkLoadTo <= 0){
            setListCount(false,searchParks)
        }
        sortParks(searchParks)
    }else{
        if(parkLoadTo <= 0){
            setListCount(false,parks)
        }
        sortParks(parks)
    }
});
