const axios = require("axios");
const { makeExecutableSchema } = require("graphql-tools");
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
      return axios.get("http://localhost:4000/games").then(res => res.data);
    },
    player({ id }) {
      console.log("resolve player " + id);
      return axios
        .get(`http://localhost:4000/players/${id}`)
        .then(res => res.data);
    }
  },
  Game: {
    players({ players }) {
      console.log("resolving players ", players);
      return Promise.all(
        players.map(id =>
          axios.get(`http://localhost:4000/players/${id}`).then(res => res.data)
        )
      );
    },
    winner(parent, args, c) {
      console.log("resolve winner ", parent.winner);
      return axios
        .get(`http://localhost:4000/players/${parent.winner}`)
        .then(res => res.data);
    }
  }
};

var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
