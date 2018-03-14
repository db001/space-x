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
const flightURL = 'https://api.spacexdata.com/v2/launches?flight_number=';
const rocketURL = 'https://api.spacexdata.com/v2/rockets/';

async function callFLightAPI(url, id) {
  let response = await fetch(`${url}${id}`);
  let data = await response.json();
  displayFlightData(data[0]);
}

// Get flight number from button id
function getFlightDetails(ele) {
  callFLightAPI(flightURL, ele.id);
}

function displayFlightData(flight) {
  const flightDiv = document.querySelector('.flightDetails');
  console.log(flight);
  if(!flight) {
    flightDiv.innerHTML = "Sorry, this flight has no further details";
    return;
  }
  flightDiv.innerHTML = `
    <p>${flight.details}</p>
    <p>${flight.launch_site.site_name_long}</p>
    <img src="${flight.links.mission_patch}">
    <h4>Rocket Details</h4>
    <p>ID: ${flight.rocket.rocket_id}, Name: ${flight.rocket.rocket_name}</p>
  `
}