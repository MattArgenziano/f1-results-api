document.querySelector('.get-results').addEventListener('click', getResults);
document.querySelector('.get-random').addEventListener('click', getRandom);
document.querySelector('#full-standings').addEventListener('click', getFullStandings);



function getResults(e){
    const year = document.getElementById('year').value;
    const round = document.getElementById('round').value;
    let standingsDiv = document.querySelector('.hidden');

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://ergast.com/api/f1/${year}/${round}/results.json`, true);

    xhr.onload = function(){
        if(this.status === 200) {
            response = this.responseText;
            // console.log(response);
            
            const yearResult = document.getElementById('yearResult');
            const roundResult = document.getElementById('roundResult');
            const circuit = document.getElementById('circuit');
            const winner = document.getElementById('winner');
            const constructor = document.getElementById('constructor');

            yearResult.innerHTML = JSON.parse(response).MRData.RaceTable.season;
            roundResult.innerHTML = JSON.parse(response).MRData.RaceTable.round;
            circuit.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Circuit.circuitName;
            constructor.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Constructor.name;
            winner.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Driver.givenName + ' ' + JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Driver.familyName;
            
            // JSON.parse(response).MRData.RaceTable.season;


        } else {
            document.querySelector('.results').innerHTML = 'ERROR';
        }
    }

    xhr.send();

    e.preventDefault();

    standingsDiv.style.visibility = 'visible';
}

function getRandom(e) {
    const year = document.getElementById('year');
    const round = document.getElementById('round');
    year.value = randomNum(1950, 2021);
    round.value = randomNum(1, 7);
    let standingsDiv = document.querySelector('.hidden');


    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://ergast.com/api/f1/${year}/${round}/results.json`, true);

    xhr.onload = function(){
        if(this.status === 200) {
            response = this.responseText;
            // console.log(response);
            
            const yearResult = document.getElementById('yearResult');
            const roundResult = document.getElementById('roundResult');
            const circuit = document.getElementById('circuit');
            const winner = document.getElementById('winner');
            const constructor = document.getElementById('constructor');

            yearResult.innerHTML = JSON.parse(response).MRData.RaceTable.season;
            roundResult.innerHTML = JSON.parse(response).MRData.RaceTable.round;
            circuit.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Circuit.circuitName;
            constructor.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Constructor.name;
            winner.innerHTML = JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Driver.givenName + ' ' + JSON.parse(response).MRData.RaceTable.Races[0].Results[0].Driver.familyName;
            
            // JSON.parse(response).MRData.RaceTable.season;


        } else {
            // document.querySelector('.results').innerHTML = 'ERROR';
        }
    }

    xhr.send();

    e.preventDefault();

    standingsDiv.style.visibility = 'visible';

    getResults();
}

// FOR FUTURE ADDITION
function getFullStandings(e){
    const year = document.getElementById('year').value;
    const round = document.getElementById('round').value;
    const fullStandings = document.querySelector('#full-standings');

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://ergast.com/api/f1/${year}/${round}/results.json`, true);

    xhr.onload = function(){
        if(this.status === 200) {
            response = this.responseText;
            let data = JSON.parse(response);
            let position = data.MRData.RaceTable.Races[0].Results[0].number;
            let races = data.MRData.RaceTable.Races;
            let results = data.MRData.RaceTable.Races[0].Results;
            let raceName = data.MRData.RaceTable.Races[0].raceName;
            let standingsText = document.getElementById('full-standings-text');
            
            let output = '';
            for (let i = 0; i < results.length; i++) {
                

                output += "<tr>"+ "<td>" + results[i].position + "</td>";
                output += "<td>" + results[i].Driver.givenName + ' ' + results[i].Driver.familyName + "</td>";
                output += "<td>" + results[i].Constructor.name + "</td>" + "</tr>";
                document.getElementById('full-results').innerHTML = output;
            } 

            standingsText.textContent = `Full standings for the ${year} ${raceName}`;

        } else {
            document.querySelector('.results').innerHTML = 'ERROR';
        }
    }

    xhr.send();

    e.preventDefault();

}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}