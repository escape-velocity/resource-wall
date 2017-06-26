const dbConfig = require('../knexfile');
const knex = require('knex')({
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },

});

var id_map = {};  // ha ha ha globals ha ha

// knex('users').truncate();

knex
.insert([
  {name: 'Nick' , profile_pic: 'http://www.placecage.com/300/200', password: 'nick'},
  {name: 'Bill' , profile_pic: 'https://www.fillmurray.com/140/100', password: 'bill'}
])
.into('users')
.returning(['name', 'id'])
.catch(err => {console.log("couldn't create Nick");})
.then(res => {
  for (var row of res) {
    id_map[row.name] = row.id;
  }
  return id_map;
})
.then(id_map => {
  return knex
  .insert([
    {user_id: id_map.Nick, category: 'awesome', url: 'www.example.com', description: 'Of all the inventions of humans, the computer is going to rank near or at the top as history unfolds and we look back. It is the most awesome tool that we have ever invented. I feel incredibly lucky to be at exactly the right place in Silicon Valley, at exactly the right time, historically, where this invention has taken form.', title: 'Example.com', image: 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg'},
    {user_id: id_map.Nick, category: 'stupid', url: 'www.google.com', description: 'I was using Twitter a lot on my phone, and was realising there was a massive gap between the link on the tweet and the full story. If you could come up with a summary layer to show in Twitter, that would be awesome.', title: 'Google', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png'},
    {user_id: id_map.Bill, category: 'health', url: 'www.facebook.com', description: 'do you even lift, sir', title: 'facebook.com', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLgmw9roFNJCQTKqiNF5GGLkTEnQyeqZlrPF_ud1M_shg57NBdT96bA'},
    {user_id: id_map.Nick, category: 'awesome', url: 'www.example.com', description: 'sick', title: 'Example.com', image: 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg'},
    {user_id: id_map.Nick, category: 'stupid', url: 'www.google.com', description: 'why does this exist', title: 'Google', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png'},
    {user_id: id_map.Bill, category: 'health', url: 'www.facebook.com', description: 'do you even lift, sir', title: 'facebook.com', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkLgmw9roFNJCQTKqiNF5GGLkTEnQyeqZlrPF_ud1M_shg57NBdT96bA'},
  ])
  .into('urls')
  .returning('id')
})
.then(url_ids => {
  function some_user_id() { return Math.random() < 0.5 ? id_map.Bill : id_map.Nick }
  function some_url_id() { return url_ids[Math.floor(Math.random() * url_ids.length)]; }

  likes_promise = knex
  .insert([
    {user_id: id_map.Nick, url_id: some_url_id(), like: true},
    {user_id: id_map.Bill, url_id: some_url_id(), like: true},
  ])
  .into('likes')

  comments_promise = knex
  .insert([
    {user_id: some_user_id(), url_id: some_url_id(), comment: "I do not approve"},
    {user_id: some_user_id(), url_id: some_url_id(), comment: "so gross.   ewwww."},
  ])
  .into('comments')

  rates_promise = knex
  .insert([
    {user_id: some_user_id(), url_id: some_url_id(), rating: 5},
    {user_id: some_user_id(), url_id: some_url_id(), rating: 0},
  ])
  .into('rates')

  return Promise.all([likes_promise, comments_promise, rates_promise]);
})


.then(res => {
  knex.destroy();
})
.catch(err => {
  console.log(err);
  knex.destroy();
})




