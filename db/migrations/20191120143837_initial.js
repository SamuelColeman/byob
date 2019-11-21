exports.up = function(knex) {
	return Promise.all([
    knex.schema.createTable('teams', (table) => {
  		table.increments('id').primary();
  		table.string('school');
  		table.string('mascot');
  		table.string('conference');

  		table.timestamps(true, true);
  	}),
  	knex.schema.createTable('conferences', (table) => {
  		table.increments('id').primary();
  		table.string('abbreviation');
  		table.foreign('name').references('teams.conference');

  		table.timestamps(true, true);
  	})
  ])
};

exports.down = function(knex) {
  return Promise.all([
  	knex.schema.dropTable('teams'),
  	knex.schema.dropTable('conferences')
  ])
};