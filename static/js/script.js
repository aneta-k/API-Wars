let currentPage = 'https://swapi.dev/api/planets/?page=1';
let previousPage = null;
let nextPage = null;

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

function init(){
    previousButton.addEventListener('click', handlePreviousPage);
    nextButton.addEventListener('click', handleNextPage);
    getTableContent();
}

function getTableContent() {
    let tableContent = document.querySelector('#planets-data');
    tableContent.innerHTML = '';
    fetch(currentPage)
        .then(response => response.json())
        .then(data =>{
            previousPage = data.previous;
            nextPage = data.next;
            if(previousPage == null){
                previousButton.setAttribute('disabled', '');
            } else {
                previousButton.removeAttribute('disabled');
            }
            if(nextPage == null){
                nextButton.setAttribute('disabled', '');
            } else {
                nextButton.removeAttribute('disabled');
            }

            let planets = data.results;
            for (let planet of planets) {
                tableContent.innerHTML += `<tr>
                                                <td>${planet.name}</td>
                                                <td>${planet.diameter}</td>
                                                <td>${planet.climate}</td>
                                                <td>${planet.terrain}</td>
                                                <td>${planet.surface_water}</td>
                                                <td>${planet.population}</td>
                                                <td>${planet.residents}</td>
                                                <td><button class="btn btn-secondary">Vote</button></td>
                                           </tr>`
            }
        })
}

function handlePreviousPage() {
    currentPage = previousPage;
    getTableContent();
}

function handleNextPage() {
    currentPage = nextPage;
    getTableContent();
}

init();