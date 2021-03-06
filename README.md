# Resource Wall

## Project Description

Pinterest for learners.

Allow learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user.

## ScreenShots

!["This is the overall landing page of Resource Wall"](https://github.com/escape-velocity/resource-wall/blob/master/Resource%20Wall%20-%20homepage.png)

!["This is the Stars Rating system for Resource Cards in the application"](https://github.com/escape-velocity/resource-wall/blob/master/Ratings%20Stars.png)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

bcrypt ^1.0.2"
body-parser ^1.15.2"
dotenv ^2.0.0"
ejs ^2.4.1"
express ^4.13.4"
knex ^0.11.7"
pg ^6.0.2"
rating-gen 0.0.6
