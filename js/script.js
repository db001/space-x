/* --- Get data form API and display it in DOM --- */

// URL to get all launches from SpaceX API
const allLaunchesURL = 'https://api.spacexdata.com/v2/launches/all';

// Get launch data from API
const getLaunchData = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  data = data.slice(-10);
  displayData(data);
}

getLaunchData(allLaunchesURL);

// Display data on DOM
function displayData(data) {
  const results = document.querySelector('.results');
  data.map(launch => {
    results.innerHTML += `
      <tr>
        <td>${launch.flight_number}</td>
        <td>${formatDate(launch.launch_date_utc)}</td>
        <td>${launch.rocket.rocket_name}</td>
        <td>${checkPastOrFuture(launch.launch_date_utc)}
          ${checkPastOrFuture(launch.launch_date_utc) === 'Launched' ? ' - ' + launchSuccess(launch) : ''}
        </td>
        <td>
          <button class="infoButton" id="${launch.flight_number}" onclick="getFlightDetails(this)">Click</button>
        </td>
      </tr>
    `
  })
}

// Check if launch date is upcoming or in the past
function checkPastOrFuture(date) {
  let currentDate = new Date();
  let dateToCheck = new Date(date);
  return currentDate < dateToCheck ? 'Upcoming' : 'Launched';
}

// Check success of launch
function launchSuccess(flight) {
  return flight.launch_success ? 'Successful' : 'Failure'
} 

// Format the date
function formatDate(date) {
  const d = new Date(date);
  return d.toUTCString();
}


/* --- Get more info on individual launch on button click --- */

// Endpoint stub for API queries
const flightURL = 'https://api.spacexdata.com/v2/launches?';

async function callFLightAPI(url, id) {
  let response = await fetch(`${url}flight_number=${id}`);
  let data = await response.json();
  displayFlightData(data[0]);
}

// Get flight number from button id
function getFlightDetails(ele) {
  callFLightAPI(flightURL, ele.id);
}

function displayFlightData(flight) {
  const flightDiv = document.querySelector('.flightDetails');
  if(!flight) {
    flightDiv.innerHTML = "Sorry, this flight has no further details";
    return;
  }
  
}