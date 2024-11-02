const sortMethod = document.querySelector('#sort-by');

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

sortMethod.addEventListener('click', () => {
    
    sortMethod.addEventListener('change', () => {
        sortParks()

        //update webpage to sorted method
        const container = document.querySelector(".park-information");
        container.innerHTML = '';
        newParks.forEach((park) => {

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

    })


});