const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/conferences', (request, response) => {
  database('conferences').select()
    .then((conferences) => {
      response.status(200).json(conferences);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('teams').where('id', request.params.id).select()
    .then(teams => {
      if (teams.length) {
        response.status(200).json(teams);
      } else {
        response.status(404).json({ 
          error: `Could not find team with id: ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/conferences/:id', (request, response) => {
  database('conferences').where('id', request.params.id).select()
    .then(conferences => {
      if (conferences.length) {
        response.status(200).json(conferences);
      } else {
        response.status(404).json({ 
          error: `Could not find conference with id: ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
	console.log(`App is running on ${app.get('port')}`)
});