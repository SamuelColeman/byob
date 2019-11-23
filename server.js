const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
};

app.get('*', (request, response) => {
	response.sendFile(path.join('server.js', 'client/build', 'index.html'));
});

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/conferences', (request, response) => {
  database('conferences').select()
    .then((conferences) => {
      response.status(200).json(conferences);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/teams/:id', (request, response) => {
  database('teams').where('id', request.params.id).select()
    .then(teams => {
      if (teams.length) {
        response.status(200).json(teams);
      } else {
        response.status(404).json({ 
          error: `Could not find team with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/conferences/:id', (request, response) => {
  database('conferences').where('id', request.params.id).select()
    .then(conferences => {
      if (conferences.length) {
        response.status(200).json(conferences);
      } else {
        response.status(404).json({ 
          error: `Could not find conference with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;
  for (let requiredParameter of ['school', 'mascot', 'conference']) {
    if (!team[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { school: <String>, mascot: <String>, conference: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('teams').insert(team, 'id')
    .then(team => {
      response.status(201).json({ id: team[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.post('/api/v1/conferences', (request, response) => {
  const conference = request.body;
  for (let requiredParameter of ['name', 'abbreviation']) {
    if (!conference[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, abbreviation: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('conferences').insert(conference, 'id')
    .then(conference => {
      response.status(201).json({ id: conference[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.delete('/api/v1/teams/:id', (request, response) => {
	database('teams').where('id', request.params.id).select().del()
   	.then(team => {
    	if (team) {
        response.status(200).json(`Team ${request.params.id} deleted`);
      } else {
        response.status(404).json({ 
          error: `Could not find team with id: ${request.params.id}`
        })
      }
    })
    .catch(error => {
    	response.status(500).json({ error });
    })
});

app.listen(app.get('port'), () => {
	console.log(`App is running on ${app.get('port')}`)
});