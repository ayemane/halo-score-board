import React, { Component } from "react";
import { map } from "lodash";
import Select from "react-select";
import style from "../styles/AddGame.scss";

export default class AddGame extends Component {
  constructor(props) {
    super(props);
    const players_options = props.players.map(player => ({
      value: player.id,
      label: player.name
    }));

    console.log("players_options", players_options);
    const maps = ["Foundry", "Guardian"];
    this.state = {
      map: "",
      players: [],
      winner: "",
      players_options: players_options,
      winner_options: [],
      map_options: maps.map(map => ({ label: map, value: map }))
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addGame(this.state);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  updateWinner({ value }, { name }) {
    console.log(value, name);
    this.setState({
      [name]: value
    });
  }

  setMap(map) {
    this.setState({
      map: map
    });
  }

  setPlayers(selectedOptions) {
    this.setState({
      players: map(selectedOptions, o => o.value)
    });
  }

  render() {
    return (
      <div className={style.addGame}>
        <form onSubmit={this.handleSubmit}>
          <div className={style.select}>
            <Select
              name="map"
              defaultValue={this.state.map}
              onChange={this.updateWinner.bind(this)}
              options={this.state.map_options}
            />
          </div>

          <div className={style.select}>
            <Select
              name="players"
              multiple={true}
              defaultValue={this.state.players}
              onChange={this.setPlayers.bind(this)}
              options={this.state.players_options}
              isMulti={true}
            />
          </div>

          <div className={style.select}>
            <Select
              name="winner"
              defaultValue={this.state.winner}
              onChange={this.updateWinner.bind(this)}
              options={this.state.players.map(p => ({
                label: p,
                value: p
              }))}
            />
          </div>
          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-lg"
          />
        </form>
      </div>
    );
  }
}
