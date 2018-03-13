# space-x

Technical interview challenge

Your task is to query the r/SpaceX API and display the results. 

The documentation for the API is here:

https://github.com/r-spacex/SpaceX-API/wiki

Call the API to get a list of all launches, and then display the ten latest. (This will be a combination of upcoming and recent.) You should show:

* the flight number,

* the launch date time,

* the rocket name,

* whether or not this is a past or upcoming launch,

* and if it is a past launch, whether or not the launch was a success.

* a link/button to more information. 

If you click the link/button for more information, you should show some additional information about the launch and the rocket:

Launch details:

• the details of the launch, if it has any

• the name of the launch site

• the mission_patch image, if it has one

Rocket Details:

• the rocket name and ID

• height

• mass

• how many stages it has

• a description of the rocket.

(This will require a separate call to fetch the rocket information. This info can be displayed as a modal or a separate page or however you like.)
