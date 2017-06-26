exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table)=> {
      table.increments('id').primary();
      table.string('name');
      table.string('password');
      //PROFILE PICTURE
      table.string('profile_pic');
      table.timestamps(true, true);
    }),

    knex.schema.createTable("urls", (table)=> {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNull().references('users');
      table.string('category').notNull();
      table.string('url').notNull();
      table.text('description').notNull();
      table.string('title');
      table.string('image');
      table.timestamps(true, true);
      // table.unique(['user_id', 'id']); //each user can not enter the same url more than once
    }),


    knex.schema.createTable("comments", (table)=> {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNull().references('users');
      table.integer('url_id').unsigned().notNull().references('urls');
      table.text('comment').notNull();
      table.timestamps(true, true);
    }),

    knex.schema.createTable("likes", (table)=> {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNull().references('users');
      table.integer('url_id').unsigned().notNull().references('urls');
      table.boolean('like');
      table.timestamps(true, true);
      table.unique(['user_id', 'url_id']);
    }),

    knex.schema.createTable("rates", (table)=> {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNull().references('users');
      table.integer('url_id').unsigned().notNull().references('urls');
      table.integer('rating');
      table.timestamps(true, true);
    })

  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('rates'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('urls'),
    knex.schema.dropTable('users')
    ]);
};

