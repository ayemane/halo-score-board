import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Game from "./Game";
import AddGame from "./AddGame";

const QUERY = gql`
  {
    games {
      id
      map
      time
      players {
				name	
			}
      winner {
				name
			}
    }
  }
`;

export class Games extends Component {
  addGame(values) {
    console.log(values);
  }

  render() {
    return (
      <Fragment>
        <h3 className="my-3">Games</h3>
        <div className="row">
          <div className="col-md-1">ID</div>
          <div className="col-md-1">map</div>
          <div className="col-md-2">players</div>
          <div className="col-md-1">winner</div>
          <div className="col-md-1">time</div>
        </div>
        <AddGame addGame={this.addGame.bind(this)} />
        <Query query={QUERY}>
          {({ loading, error, data }) => {
						console.log({data})
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return (
              <Fragment>
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
