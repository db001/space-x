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
          <button class="infoButton" id="${launch.flight_number}" data-rocket=${launch.rocket.rocket_id} onclick="getFlightDetails(this)">Click</button>
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
// Individual flight
const flightURL = 'https://api.spacexdata.com/v2/launches?flight_number=';

// Rocket information
const rocketURL = 'https://api.spacexdata.com/v2/rockets/';

// Get flight number from button id
async function getFlightDetails(ele) {

  // Get data for flight 
  let response = await fetch(`${flightURL}${ele.id}`);
  let data = await response.json();
  displayFlightData(data[0]);

  // Get rocket data
  let rocketResponse = await fetch(`${rocketURL}${ele.dataset.rocket}`);
  let rocketData = await rocketResponse.json();
  displayRocketInfo(rocketData);
}

function displayFlightData(flight) {
  const flightDiv = document.querySelector('.flightDetails');
  if(!flight) {
    flightDiv.innerHTML = `
    <h4>Flight details</h4>  
    <p>Sorry, this flight has no further details</p>
    `;
    return;
  }

  console.log(flight.links.mission_patch);
  flightDiv.innerHTML = `
    <h4>Flight details</h4>
    <p>${flight.details}</p>
    <p><strong>Launch site:</strong> ${flight.launch_site.site_name_long}</p>
    <figure>
      <img src="${flight.links.mission_patch}" alt="Flight ${flight.flight_number} Mission Patch" title="Flight ${flight.flight_number} Mission Patch">
      <figcaption>Flight ${flight.flight_number} Mission Patch</figcaption>
    </figure>
    <br>
  `
}

function displayRocketInfo(rocket) {
  const rocketDiv = document.querySelector('.rocketInfo');
  if(!rocketDiv) {
    rocketDiv.innerHTML = `
      <h4>Rocket Details</h4>
      <p>Sorry, this flight has no further details</p>
    `
    ;
    return;
  }
  rocketDiv.innerHTML = `
    <h4>Rocket Details</h4>
    <p><strong>Name:</strong> ${rocket.name}, ID: ${rocket.id}</p>
    <p><strong>Description:</strong> ${rocket.description}</p>
    <p><strong>Height:</strong> ${rocket.height.meters} metres</p>
    <p><strong>Mass:</strong> ${rocket.mass.kg} kg</p>
    <p><strong>Number </strong>of stages: ${rocket.stages}</p>
    
  `
}