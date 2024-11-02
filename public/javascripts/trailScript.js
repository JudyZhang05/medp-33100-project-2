const sortMethod = document.querySelector('#sort-by');
const searchBar = document.querySelector('#search-bar');

let searchOpt = false;
let searchParks = [];
let newParks = [];
function sortQuantity(){
    let parksQuantity = []
    for (let i = 0; i < parks.length; i++){
        parksQuantity.push({
            'name': parks[i]
            ,'amount': amount[i]
        });      
    }
    parksQuantity.sort((a,b) => {   //sorts highest to lowest amount of trails
        if(sortMethod.value == "Ascending Quantity"){
            return b.amount-a.amount;
        }else{
            return a.amount-b.amount;
        }
    })
    newParks = parksQuantity;
}

function sortParks(){   //sorting methods
    if(sortMethod.value == "Default"){
        newParks = parks;
    }else if(sortMethod.value == "Ascending Alphabet"){
        newParks = parks.toSorted()
    }else if(sortMethod.value == "Descending Alphabet"){
        newParks = parks.toSorted().reverse()
    }else if(sortMethod.value == "Ascending Quantity" || sortMethod.value == "Descending Quantity" ){
        sortQuantity()
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
            nameH.innerHTML = park.name  
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
        sortParks()
        if(searchOpt === true){
            loadParks(searchParks) //fix
        }else{
            loadParks(newParks)
        }
    })
});

//Search method
searchBar.addEventListener('click', () => {
    searchBar.addEventListener('keypress',(event) => {
        if(searchBar.value.length > 0 && event.key === "Enter"){
            searchOpt = true;
            searchParks = []
            parks.forEach((parkName) => {
                if(parkName.toLowerCase().includes(searchBar.value.toLowerCase())){
                    searchParks.push([parkName])
                }
            })
            loadParks(searchParks) 
        }else if (searchBar.value.length === 0 && event.key === "Enter"){
            searchOpt = false;
            searchParks = parks; 
            sortParks()
            loadParks(searchParks) //Fix dictionary searchparks needs to be a list of dictionary Movie :partytime:
        }
    })
});