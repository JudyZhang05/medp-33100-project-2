const sortButton = document.querySelector('#sortButton');

let sortType = 0;
let newParks = [];

function sortParks(){
    if(sortType == 0){
        newParks = parks.toSorted()
    }else if(sortType == 1){
        newParks = parks.toSorted().reverse()
    }else{
        newParks = parks;
    }
}

sortButton.addEventListener('click', () => {
    sortParks()

    sortType < 2 ? sortType++ : sortType = 0; 

    const container = document.querySelector("#box");
    container.innerHTML = '';
    newParks.forEach((park) => {
        const liEl = document.createElement('li');
        const pEl = document.createElement('p');
        pEl.innerHTML = park;
        liEl.appendChild(pEl);
        container.appendChild(liEl);
    });

});
