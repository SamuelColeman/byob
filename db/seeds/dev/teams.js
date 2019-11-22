const teams = require('../../../teams');
const conferences = require('../../../conferences');

const createConference = (knex, conference) => {
  return knex('conferences').insert({
    name: conference.name,
    abbreviation: conference.abbreviation
  }, 'name')
  .then(name => {
    let teamPromises = [];

    teams.filter(team => team.conference === name[0])
      .forEach(team => {
        teamPromises.push(createTeam(knex, {
          school: team.school,
          mascot: team.mascot,
          conference: name[0]
        }))
      })
    return Promise.all(teamPromises);
  })
};

const createTeam = (knex, team) => {
  return knex('teams').insert(team);
};

exports.seed = (knex) => {
  return knex('teams').del() 
    .then(() => knex('conferences').del())
    .then(() => {
      let conferencePromises = [];

      conferences.forEach(conference => {
        conferencePromises.push(createConference(knex, conference));
      });

      return Promise.all(conferencePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};