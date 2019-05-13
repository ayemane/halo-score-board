const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLInt },
    map: { type: GraphQLString },
    time: { type: GraphQLString },
    players: { type: new GraphQLList(PlayerType) },
    winner: { type: PlayerType }
  })
});

const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    avatar: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return axios.get("http://localhost:4000/games").then(res => res.data);
      }
    },
    game: {
      type: GameType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:4000/games/${args.id}`)
          .then(res => res.data);
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return axios.get("http://localhost:4000/players").then(res => res.data);
      }
    },
    player: {
      type: PlayerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return axios
          .get(`http://localhost:4000/players/${id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
