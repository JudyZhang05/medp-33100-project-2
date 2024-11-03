const sortMethod = document.querySelector('#sort-by');
const searchBar = document.querySelector('#search-bar');

let searchOpt = false;
let searchParks = [];
let newParks = [];
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
    if(searchOpt === false){
        parkList = parks;
    }else{
        parkList = searchParks;
    }
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

function loadParks(parkList){
    //update webpage to sorted method
    const container = document.querySelector(".park-information");
    container.innerHTML = '';
    parkList.forEach((park) => {

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
            nameH.innerHTML = park.name; 
        }else{
            nameH.innerHTML = park;
        }

        container.appendChild(boxDiv);
        boxDiv.appendChild(imgDiv);
        boxDiv.appendChild(nameDiv);
        nameDiv.appendChild(nameH);
        nameDiv.appendChild(descP);
    });
}

//Sorting method selection options
sortMethod.addEventListener('click', () => {
    sortMethod.addEventListener('change', () => {
        if(searchOpt === true){
            sortParks(searchParks)
        }else{
            newParks = parks;
            sortParks(newParks);
        }
    })
});

//Search method
searchBar.addEventListener('click', () => {
    searchBar.addEventListener('keydown',(event) => {
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
})