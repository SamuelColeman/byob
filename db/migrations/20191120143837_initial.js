exports.up = function(knex) {
	return Promise.all([
  	knex.schema.createTable('conferences', (table) => {
  		table.increments('id').primary();
  		table.string('name');
  		table.unique('name');
  		table.string('abbreviation');

  		table.timestamps(true, true);
  	}),
    knex.schema.createTable('teams', (table) => {
  		table.increments('id').primary();
  		table.string('school');
  		table.string('mascot');
  		table.string('conference');
  		table.foreign('conference').references('conferences.name');
  
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