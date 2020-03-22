require('dotenv').config()

module.exports = {
  development: {
    database: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    database: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    database: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}