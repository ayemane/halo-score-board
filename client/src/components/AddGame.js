import React, { Component } from "react";
import moment from "moment";
import { map } from "lodash";

export default class AddGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: "",
      players: [],
      winner: ""
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

  setPlayers(e) {
    this.setState({ players: map(e.target.selectedOptions, o => o.value) });
    //console.log(this.state.players);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-1">.</div>
          <div className="col-md-2">
            <select
              name="map"
              defaultValue={this.state.map}
              onChange={this.handleInputChange}
            >
              <option>Guardian</option>
              <option>Foundry</option>
              <option>Isolation</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="players"
              multiple={true}
              defaultValue={this.state.players}
              //value={this.state.players}
              onChange={this.setPlayers.bind(this)}
            >
              <option>klept0</option>
              <option>booska</option>
              <option>pinky</option>
              <option>iKill</option>
              <option>gypC</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="winner"
              defaultValue={this.state.winner}
              onChange={this.handleInputChange}
            >
              <option>klept0</option>
              <option>booska</option>
              <option>pinky</option>
              <option>iKill</option>
              <option>gypC</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="time"
              defaultValue={moment().format("LLLL")}
            />
          </div>
          <div className="col-md-1">
            <input type="submit" value="Add" />
          </div>
        </div>
      </form>
    );
  }
}
