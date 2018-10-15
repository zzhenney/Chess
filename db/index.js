const pgp = require('pg-promise')();

const connection = pgp(process.env.DATABASE_URL);
console.log(connection);

module.exports = connection;