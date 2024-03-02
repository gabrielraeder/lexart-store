require('dotenv').config()

module.exports = {
  development: {
    username: "root",
    password: process.env.POSTGRES_PASSWORD,
    database: "database_development",
    host: process.env.POSTGRES_URL,
    dialect: "postgresql"
  },
  test: {
    username: "root",
    password: process.env.POSTGRES_PASSWORD,
    database: "database_test",
    host: process.env.POSTGRES_HOST,
    dialect: "postgresql"
  },
  production: {
    username: "root",
    password: process.env.POSTGRES_PASSWORD,
    database: "database_production",
    host: process.env.POSTGRES_HOST,
    dialect: "postgresql"
  }
};
