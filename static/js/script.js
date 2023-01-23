let currentPage = 'https://swapi.dev/api/planets/?page=1';
let previousPage = null;
let nextPage = null;

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');

function init(){
    previousButton.addEventListener('click', handlePreviousPage);
    nextButton.addEventListener('click', handleNextPage);
    getTableContent();
    getVotingStatistics();
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
    let residents = planet.residents.length === 0 ? 'No known residents' : initModal(planet.name, planet.residents);
    let voteButton = userX !== 'None' ? `<td><button class="btn btn-secondary" onclick="voteForPlanet('${planet.name}')">Vote</button></td>` : '';
    return `<tr>
                    <td>${planet.name}</td>
                    <td>${diameter}</td>
                    <td>${planet.climate}</td>
                    <td>${planet.terrain}</td>
                    <td>${waterSurfacePercentage}</td>
                    <td>${population}</td>
                    <td>${residents}</td>
                    ${voteButton}
                </tr>`;
    // return row;
}

function initModal(planetName, residents){
    createModal(planetName);
    fillInModalTable(planetName, residents);
    return `<button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${planetName.replace(/ /gi, "")}">
                ${residents.length} resident(s)
            </button>`
}

function createModal(planetName) {
    const planetNameSimplified = planetName.replace(/ /gi, "");
    let residentsTable = createResidentsTable(planetNameSimplified);
    let modals = document.querySelector('#modals');
    modals.innerHTML += `<div class="modal fade" id="${planetNameSimplified}" tabindex="-1" aria-labelledby="${planetNameSimplified}Label" aria-hidden="true">
                              <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="${planetNameSimplified}Label">Residents of ${planetName}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                        <div class="table-responsive">
                                        ${residentsTable}
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                              </div>
                          </div>`
}

function createResidentsTable(planetName) {
    return `<div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Mass</th>
                            <th>Hair color</th>
                            <th>Skin color</th>
                            <th>Eye color</th>
                            <th>Birth year</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody id="${planetName}Table">
                    </tbody> 
                </table> 
            </div>`
}

function fillInModalTable(planetName, residents) {
    for(let resident of residents){
        fetch(resident)
            .then(response => response.json())
            .then(data =>{
                let modalTableBody = document.querySelector(`#${planetName.replace(/ /gi, "")}Table`);
                modalTableBody.innerHTML += `<tr>
                                        <td>${data.name}</td>
                                        <td>${data.height}</td>
                                        <td>${data.mass}</td>
                                        <td>${data.hair_color}</td>
                                        <td>${data.skin_color}</td>
                                        <td>${data.eye_color}</td>
                                        <td>${data.birth_year}</td>
                                        <td>${data.gender}</td>
                                    </tr>`
            })
    }
}

function voteForPlanet(planetName) {
    const dataToConvert = {
        'planet_name': planetName
    }
    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToConvert)
    })
        .then(response => response.json())
        .then(data =>{
            alert(`Voted on planet ${planetName} successfully!`);
            getVotingStatistics();
        })
        .catch(err => {
            alert(`There was an error during voting on planet: ${err}`)
        })
}

function getVotingStatistics(){
    fetch('/get_voting_statistics')
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            let modalVotes = document.querySelector('#stats-table')
            modalVotes.innerHTML = '';
            for (let stat of data){
                modalVotes.innerHTML += `<tr>
                                            <td>${stat.planet_name}</td>
                                            <td>${stat.count}</td>
                                         </tr>`
            }
        })
}

init();