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
    player_name: { type: GraphQLString },
    avatar: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    games: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    game: {
      type: LaunchType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/games/${args.id}`)
          .then(res => res.data);
      }
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parent, args) {
        return axios.get("http://localhost:3000/players").then(res => res.data);
      }
    },
    player: {
      type: PlayerType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`http://localhost:3000/players/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
