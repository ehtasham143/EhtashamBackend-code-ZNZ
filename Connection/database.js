const { Sequelize } = require("sequelize");
require("dotenv").config();
// Load database credentials from environment variables
const { DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
// Create a PostgreSQL connection pool
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the PostgreSQL database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

module.exports=sequelize;