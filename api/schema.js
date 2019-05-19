const axios = require("axios");
const { makeExecutableSchema } = require("graphql-tools");
const db = require("./config/database");

//import { makeExecutableSchema } from "graphql-tools";

var typeDefs = [
  `
  type Player{
    id: ID!
    name: String
    avatar: String
  }

  type Game {
    id: Int!
    map: String!
    time: String
    players: [Player]
    winner: Player
  }

  type Query {
    games: [Game!]!
    player(id: String!): Player
  }

  schema {
    query: Query
  }`
];

var resolvers = {
  Query: {
    games: () => {
      console.log("fetch ALL games");
      return db.Game.findAll()
        .then(games => {
          console.log("fetched count" + games.length);
          return games;
        })
        .catch(err => console.log(err));
    },
    player({ id }) {
      console.log("resolve player " + id);
      return db.Player.findByPk(id);
    }
  },
  Game: {
    players({ players }) {
      players = players.split(",");
      return Promise.all(players.map(id => db.Player.findByPk(id)));
    },
    winner(parent, args) {
      console.log("resolve winner ", parent.winner);
      return db.Player.findByPk(parent.winner);
    }
  }
};

var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
