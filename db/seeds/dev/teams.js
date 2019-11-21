const teams = require('../../../teams');
const conferences = require('../../../conferences');

const createConference = (knex, conference) => {
  return knex('conferences').insert({
    name: conference.name
    abbreviation: conference.abbreviation
  }, '')
  .then(conferenceId => {
    let teamPromises = [];

    teams.forEach(team => {
      teamPromises.push(createTeam(knex, {

      }))
    })

    paper.footnotes.forEach(footnote => {
      footnotePromises.push(createFootnote(knex, {
        note: footnote,
        paper_id: paperId[0]
      }))
    })
    return Promise.all(footnotePromises);
  })
};

const createFootnote = (knex, footnote) => {
  return knex('footnotes').insert(footnote);
};

exports.seed = (knex) => {
  return knex('teams').del() 
    .then(() => knex('conferences').del())
    .then(() => {
      let paperPromises = [];

      papersData.forEach(paper => {
        paperPromises.push(createPaper(knex, paper));
      });

      return Promise.all(paperPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};