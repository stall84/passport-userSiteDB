require('dotenv').config();

module.exports = 
{
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: "UsersDB",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorAliases: false
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorAliases: false
  }
}
