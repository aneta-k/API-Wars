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
                tableContent.innerHTML += addRowWithPlanet(planet);
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

function addRowWithPlanet(planet){
    let diameter = planet.diameter !== "unknown" ? `${Number(planet.diameter).toLocaleString()} km` : planet.diameter;
    let waterSurfacePercentage = planet.surface_water !== "unknown" ? `${planet.surface_water}%` : planet.surface_water;
    let population = planet.population !== "unknown" ? `${Number(planet.population).toLocaleString()} people` : planet.population;
    let residents = planet.residents.length === 0 ? 'No known residents' : createModal(planet.name, planet.residents);
    let row = `<tr>
                    <td>${planet.name}</td>
                    <td>${diameter}</td>
                    <td>${planet.climate}</td>
                    <td>${planet.terrain}</td>
                    <td>${waterSurfacePercentage}</td>
                    <td>${population}</td>
                    <td>${residents}</td>
                    <td><button class="btn btn-secondary">Vote</button></td>
                </tr>`;
    return row;
}

function createModal(planetName, residents) {
    const planetNameSimplified = planetName.replace(/ /gi, "");
    let residentsTable = getResidentsTable(residents);
    let modals = document.querySelector('#modals');
    modals.innerHTML += `<div class="modal fade" id="${planetNameSimplified}" tabindex="-1" aria-labelledby="${planetNameSimplified}Label" aria-hidden="true">
                              <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="${planetNameSimplified}Label">Residents of ${planetName}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        ${residentsTable}
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                              </div>
                          </div>`
    return `<button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${planetNameSimplified}">
                ${residents.length} resident(s)
            </button>`
}

function getResidentsTable(residents) {

}

init();