exports.seed = function(knex, Promise) {
  return knex('users').del()
  return knex('urls').del()
};



