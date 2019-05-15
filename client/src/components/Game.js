import React from "react";

export default function Game(props) {
  return (
    <div className="row">
      <div className="col-md-1">{props.game.id}</div>
      <div className="col-md-1">{props.game.map}</div>
      <div className="col-md-2">
        {props.game.players.map(p => p.id).join(", ")}
      </div>
      <div className="col-md-1">{props.game.winner.name}</div>
      <div className="col-md-1">{props.game.time}</div>
    </div>
  );
}
