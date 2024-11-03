const sortMethod = document.querySelector('#sort-by');
const searchBar = document.querySelector('#search-bar');
const rarrow = document.querySelector('.right');
const larrow = document.querySelector('.left');

let searchOpt = false;
let searchParks = [];
let newParks = [];
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


function setListCount(){
    parkLoadFrom = 0;
    parkLoadTo = 6;
}

function loadParks(parkList){
    //update webpage to sorted method
    const container = document.querySelector(".park-information");
    container.innerHTML = '';

    if(parkLoadTo > parkList.length){
        parkLoadTo = parkList.length
    }

    for(let load = parkLoadFrom; load < parkLoadTo; load++){    //update only 6 at a time
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('container');
        
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('park-image');
        imgDiv.innerText="Image"

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('park-name');

        const nameH = document.createElement('h3');
        const descP = document.createElement('p');
        descP.innerText = "Learn more"

        if(sortMethod.value == "Ascending Quantity" || sortMethod.value == "Descending Quantity"){
            nameH.innerHTML = parkList[load].name; 
        }else{
            nameH.innerHTML = parkList[load];
        }

        container.appendChild(boxDiv);
        boxDiv.appendChild(imgDiv);
        boxDiv.appendChild(nameDiv);
        nameDiv.appendChild(nameH);
        nameDiv.appendChild(descP);
    }
}

//Sorting method selection options
sortMethod.addEventListener('click', () => {
    sortMethod.addEventListener('change', () => {
        setListCount()
        if(searchOpt === true){
            sortParks(searchParks)
        }else{
            newParks = parks; //don't need newparks
            sortParks(parks);
        }
    })
});


//Search method
searchBar.addEventListener('click', () => {
    searchBar.addEventListener('keydown',(event) => {
        setListCount()
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

//arrows
rarrow.addEventListener('click', () => {
    parkLoadFrom+=6;
    parkLoadTo+=6;
    
    if(searchOpt === true){
        if(parkLoadTo > searchParks.length){
            setListCount()
        }
        sortParks(searchParks)
    }else{
        if(parkLoadTo > parks.length){
            setListCount()
        }
        sortParks(parks)
    }
});
