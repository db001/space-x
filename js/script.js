const allLaunchesUrl = 'https://api.spacexdata.com/v2/launches/all';

// Get launch data from API
const getLaunchData = async (url) => {
  let response = await fetch(url);

  let data = await response.json();
  displayData(data);
  // console.log(data);
}

getLaunchData(allLaunchesUrl);

// Display data on DOM
function displayData(data) {
  const resultsDiv = document.querySelector('.results');
  data.map(launch => {
    resultsDiv.innerHTML += `
      <ul id="Flight${launch.flight_number}">
        <li>Flight number: ${launch.flight_number}</li>
        <li>Launch date: ${launch.launch_date_utc}</li>
        <li>Rocket name: ${launch.rocket.rocket_name}</li>
        <li>Launch status: ${checkPastOrFuture(launch.launch_date_utc)}</li>
        <li>Flight number: ${launch.flight_number}</li>
      </ul>
    `
  })
}

function checkPastOrFuture(date) {
  return date > Date.now() ? 'Upcoming' : 'Launched';
}