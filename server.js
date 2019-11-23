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
  const { id } = request.params;
  database('teams')
    .where({ id: id })
    .then(team => {
      if (team.length === 0) {
        response.status(404).json({ error: 'No Team Found' });
      }
      response.status(200).json(team[0]);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/conferences/:id', (request, response) => {
  const { id } = request.params;
  database('conferences')
    .where({ id: id })
    .then(conference => {
      if (conference.length === 0) {
        response.status(404).json({ error: 'No Conference Found' });
      }
      response.status(200).json(conference[0]);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
	console.log(`App is running on ${app.get('port')}`)
});