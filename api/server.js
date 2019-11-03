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

app.post("/who-won-the-last-game", function(req, res) {
  db.Game.max("id").then(max => {
    db.Game.findByPk(max).then(game => {
      res.send({
        fulfillmentText: game.winner + " won the last game",
        source: "https://app.thehaloscore.com",
        payload: {
          google: {
            expectUserResponse: false,
            richResponse: {
              items: [
                {
                  simpleResponse: {
                    textToSpeech: game.winner + " won the last game"
                  }
                }
              ]
            }
          }
        }
      });
    });
  });
});

app.post("/dialog-flow/save-score", function(req, res) {
  const {
    queryResult: {
      parameters: { players, winner, map }
    }
  } = req.body;

  db.Game.create({
    map,
    players: (players || []).join(","),
    winner,
    time: Date.now()
  }).then(({ game }, created) => {
    res.send({
      //fulfillmentText: `Got it. map ${map}, winner ${winner}. I've updated the scoreboard. Game number ${
      fulfillmentText: `Got it. Game ${
        game.id
      }, ${winner} won on ${map}. I've updated the scoreboard`,
      source: "https://app.thehaloscore.com",
      payload: {
        google: {
          expectUserResponse: false,
          richResponse: {
            items: [
              {
                simpleResponse: {
                  textToSpeech: `Got it. map ${map}, winner ${winner}. I've updated the scoreboard`
                }
              }
            ]
          }
        }
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
