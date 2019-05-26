const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");

//const schema = require("./schemaUsingJS");
const schema = require("./schema");
const db = require("./config/database");

const app = express();
const cors = require("cors");

app.use(express.static("client/dist"));
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(bodyParser.json());
app.post("/games", function(req, res) {
  console.log("Add Game!!", req.body);
  const { map, players, time, winner } = req.body;
  console.log("map", map);

  db.Game.create({
    map,
    players: (players || []).join(","),
    winner,
    time: Date.now()
  }).then(({ game }, created) => {
    res.send(game);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
