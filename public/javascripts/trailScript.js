const sortButton = document.querySelector('#sortButton');

let sortType = 0;
let newParks = [];
let parksQuantity = []

function sortQuantity(){
    for (let i = 0; i < parks.length; i++){
        parksQuantity.push({
            'name': parks[i]
            ,'amount': amount[i]
        });      
    }
    parksQuantity.sort((a,b) => {   //sorts highest to lowest amount of trails
        if(sortType == 2){
            return b.amount-a.amount;
        }else{
            return a.amount-b.amount;
        }
    })
    newParks = parksQuantity;
}

function sortParks(){   //sorting methods
    if(sortType == 0){
        newParks = parks.toSorted()
    }else if(sortType == 1){
        newParks = parks.toSorted().reverse()
    }else if(sortType == 2 || sortType == 3){
        sortQuantity()
    }else if(sortType == 4){
        newParks = parks;
    }
}

sortButton.addEventListener('click', () => {
    sortParks()

    //shuffle through amount of sorting methods
    sortType < 4 ? sortType++ : sortType = 0; 
    console.log(sortType)

    //update webpage to sorted method
    const container = document.querySelector("#box");
    container.innerHTML = '';
    newParks.forEach((park) => {
        const liEl = document.createElement('li');
        const pEl = document.createElement('p');
        if(sortType === 3 || sortType === 4){
            pEl.innerHTML = park.name  
        }else{
            pEl.innerHTML = park;
        }
        liEl.appendChild(pEl);
        container.appendChild(liEl);
    });
});