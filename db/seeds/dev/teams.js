// const teams = require('../../../teams');
// const conferences = require('../../../conferences');

// const createConference = (knex, conference) => {
//   return knex('conferences').insert({
//     abbreviation: conference.abbreviation
//     conference: conference.title,
//     author: paper.author
//   }, 'id')
//   .then(paperId => {
//     let footnotePromises = [];

//     paper.footnotes.forEach(footnote => {
//       footnotePromises.push(createFootnote(knex, {
//         note: footnote,
//         paper_id: paperId[0]
//       }))
//     })
//     return Promise.all(footnotePromises);
//   })
// };

// const createFootnote = (knex, footnote) => {
//   return knex('footnotes').insert(footnote);
// };

// exports.seed = (knex) => {
//   return knex('teams').del() 
//     .then(() => knex('conferences').del())
//     .then(() => {
//       let paperPromises = [];

//       papersData.forEach(paper => {
//         paperPromises.push(createPaper(knex, paper));
//       });

//       return Promise.all(paperPromises);
//     })
//     .catch(error => console.log(`Error seeding data: ${error}`));
// };