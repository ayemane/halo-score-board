var mysqlModel = require("mysql-model");
var MyAppModel = mysqlModel.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "halo_scoreboard"
});

module.exports.game = new MyAppModel({ tableName: "games" });
module.exports.player = new MyAppModel({ tableName: "players" });
