import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Game from "./Game";
import AddGame from "./AddGame";
import axios from "axios";

const QUERY = gql`
  {
    games {
      id
      map
      time
      players {
        id
        name
        avatar
      }
      winner {
        name
      }
    }
    players {
      id
      name
      avatar
    }
  }
`;

export class Games extends Component {
  addGame(game) {
    console.log(game);
    axios.post(process.env.API_URL + "/games", game);
  }

  render() {
    return (
      <Fragment>
        <Query query={QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return (
              <Fragment>
                <h3 className="my-5">Games Played: {data.games.length}</h3>

                <AddGame
                  players={data.players}
                  addGame={this.addGame.bind(this)}
                />

                {data.games.map(game => (
                  <Game key={game.id} game={game} />
                ))}
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
export default Games;
