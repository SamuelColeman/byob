exports.up = function(knex) {
	return Promise.all([
  	knex.schema.createTable('conferences', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  		table.string('abbreviation');

  		table.timestamps(true, true);
  	}),
    knex.schema.createTable('teams', (table) => {
  		table.increments('id').primary();
  		table.string('school');
  		table.string('mascot');
  		table.string('conference');
  		table.integer('conference_id').unsigned();
  		table.foreign('conference_id').references('conferences.id');
  
  		table.timestamps(true, true);
  	})
  ])
};

exports.down = function(knex) {
  return Promise.all([
  	knex.schema.dropTable('conferences'),
  	knex.schema.dropTable('teams')
  ])
};