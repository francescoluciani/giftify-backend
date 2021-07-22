const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ElonMusknumero1!",
  database: "giftify",
});

module.export = connection;
