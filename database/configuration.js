require("dotenv").config();

const {
    Pool
} = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});

pool.on("connect", () =>
    console.log(`We have a connection with database ${process.env.DB_NAME}`)
);

module.exports = pool;