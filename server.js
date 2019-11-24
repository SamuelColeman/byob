const express = require('express'); 
// The line above imports express so that its built in methods can be accessed
const app = express();
// This line creates a new instance of express assigned to app variable
const bodyParser = require('body-parser')
// Imports bodyParser to be used to edit the format of the data

const environment = process.env.NODE_ENV || 'development';
// This line checks if the environment is in development, testing, or production and assigns the current one to environment variable, defaults to development
const configuration = require('./knexfile')[environment];
// Assigns the correct environment stage from our knexfile to configuration variable
const database = require('knex')(configuration);
// Uses new configuration variable to fetch the correct database configuration and assigns it to database variable

app.set('port', process.env.PORT || 3000);
// Establishes a port for our server to be run on, defaults to 3000

app.use(bodyParser.json());
// Parses our body data to an acceptable format for posting and deleting methods

app.get('/api/v1/teams', (request, response) => {
  // Runs when a get request is made on localhost:3000/api/v1/teams and opens callback function with request and response parameters
  database('teams').select()
  // Selects 'teams' table from our cfb database
    .then((teams) => {
      // Waits for a response containing teams data
      response.status(200).json(teams);
      // Sets response status of 200 OK, and reformats teams data then displays the array of team objects as a successful response 
    })
    .catch((error) => {
      // Catches any errors that caused the get request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.get('/api/v1/conferences', (request, response) => {
  // Runs when a get request is made on localhost:3000/api/v1/conferences and opens callback function with request and response parameters
  database('conferences').select()
  // Selects 'conferences' table from our cfb database
    .then((conferences) => {
      // Waits for a response containing conferences data
      response.status(200).json(conferences);
      // Sets response status of 200 OK, and reformats conferences data then displays the array of conference objects as a successful response
    })
    .catch((error) => {
      // Catches any errors that caused the get request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.get('/api/v1/teams/:id', (request, response) => {
  // Runs when a get request is made on localhost:3000/api/v1/teams/:id where id matches that of the team expected to return and opens callback function with request and response parameters
  database('teams').where('id', request.params.id).select()
  // Selects a specific team object from the 'teams' table where the id matches the one entered in the url
    .then(teams => {
      // Waits for a response containing a team's data
      if (teams.length) {
        // Checks if any team was found with the entered id
        response.status(200).json(teams);
        // Sets response status of 200 OK, and reformats the team's data then displays the selected team object as a successful response
      } else {
        // No team was found with entered id
        response.status(404).json({ 
          error: `Could not find team with id: ${request.params.id}`
        })
        // Sets reponse status of 404: Not Found, and displays a message letting the user know that a team could not be found with the entered id 
      }
    })
    .catch(error => {
      // Catches any errors that caused the get request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.get('/api/v1/conferences/:id', (request, response) => {
  // Runs when a get request is made on localhost:3000/api/v1/conferences/:id where id matches that of the conference expected to return and opens callback function with request and response parameters
  database('conferences').where('id', request.params.id).select()
  // Selects a specific conference object from the 'conferences' table where the id matches the one entered in the url
    .then(conferences => {
      // Waits for a response containing a conference's data
      if (conferences.length) {
        // Checks if any conference was found with the entered id
        response.status(200).json(conferences);
        // Sets response status of 200 OK, and reformats the conference's data then displays the selected conference object as a successful response
      } else {
        // No conference was found with entered id
        response.status(404).json({ 
          error: `Could not find conference with id: ${request.params.id}`
        })
        // Sets reponse status of 404: Not Found, and displays a message letting the user know that a conference could not be found with the entered id 
      }
    })
    .catch(error => {
      // Catches any errors that caused the get request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.post('/api/v1/teams', (request, response) => {
  // Runs when a post request is made on localhost:3000/api/v1/teams and opens callback function with request and response parameters
  const team = request.body;
  // Assigns team variable to the body of the request that was made when posting
  for (let requiredParameter of ['school', 'mascot', 'conference']) {
    // Opens for loop for each parameter that is required in the post body
    if (!team[requiredParameter]) {
      // Checks to see if any of the required parameters are missing within the body of the post request
      return response
        .status(422)
        .send({ error: `Expected format: { school: <String>, mascot: <String>, conference: <String> }. You're missing a "${requiredParameter}" property.` });
        // Sets reponse status of 422: Unprocessable Entity, and displays a message letting the user know what the expected format should be and which required parameter is missing 
    }
  }

  database('teams').insert(team, 'id')
  // Inserts new posted team into the 'teams' table and assigns it a new id based on an increment of the table
    .then(team => {
      // Waits for a response containing the new team's data
      response.status(201).json({ id: team[0] })
      // Sets response status of 201: Success, and returns a json object containing the id of the newly added team 
    })
    .catch(error => {
      // Catches any errors that caused the post request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.post('/api/v1/conferences', (request, response) => {
  // Runs when a post request is made on localhost:3000/api/v1/conferences and opens callback function with request and response parameters
  const conference = request.body;
  // Assigns conference variable to the body of the request that was made when posting
  for (let requiredParameter of ['name', 'abbreviation']) {
    // Opens for loop for each parameter that is required in the post body
    if (!conference[requiredParameter]) {
      // Checks to see if any of the required parameters are missing within the body of the post request
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, abbreviation: <String> }. You're missing a "${requiredParameter}" property.` });
        // Sets reponse status of 422: Unprocessable Entity, and displays a message letting the user know what the expected format should be and which required parameter is missing
    }
  }

  database('conferences').insert(conference, 'id')
  // Inserts new posted conference into the 'conferences' table and assigns it a new id based on an increment of the table
    .then(conference => {
      // Waits for a response containing the new conference's data
      response.status(201).json({ id: conference[0] })
      // Sets response status of 201: Success, and returns a json object containing the id of the newly added conference
    })
    .catch(error => {
      // Catches any errors that caused the post request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.delete('/api/v1/teams/:id', (request, response) => {
  // Runs when a delete request is made on localhost:3000/api/v1/teams/:id where id matches that of the team to be removed and opens callback function with request and response parameters
	database('teams').where('id', request.params.id).select().del()
    // Selects a specific team object from the 'teams' table where the id matches the one entered in the url and deletes it from the table
   	.then(team => {
      // Waits for a response containing a team's data
    	if (team) {
        // Checks if any team exists matching the entered id
        response.status(200).json(`Team ${request.params.id} deleted`);
        // Sets response status of 200 OK, and displays a message to the user to confirm that the selected team was deleted
      } else {
        // No team was found with entered id
        response.status(404).json({ 
          error: `Could not find team with id: ${request.params.id}`
        })
        // Sets reponse status of 404: Not Found, and displays a message letting the user know that a team could not be found with the entered id 
      }
    })
    .catch(error => {
      // Catches any errors that caused the get request to fail
      response.status(500).json({ error });
      // Sets reponse status of 500: Internal Server Error, and displays the error as a response
    })
});

app.listen(app.get('port'), () => {
  // Detects any changes made to the app and restarts the server
	console.log(`App is running on ${app.get('port')}`)
  // Logs a message to display that the server is running successfully and which port the server is running on
});