require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_URL,
    dialect: "postgres",
    dialectModule: require('pg')
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_test",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres"
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "database_production",
    host: process.env.POSTGRES_HOST,
    dialect: "postgres"
  }
};
