import React from "react";
import style from "../styles/Game.scss";
import Player from "./Player";
import foundry_image from "../images/foundry.png";

export default function Game({ game: { id, map, players, winner, time } }) {
  return (
    <div className={style.game}>
      <div className={style.box}>
        <div
          className={style.map}
          style={{ backgroundImage: "url(" + foundry_image + ")" }}
        >
          {map}
        </div>

        <span className={style.id}>
          {id}
          <span className={style.winner}>
            <span>{winner.name}</span>
          </span>
        </span>
        <div className={style.players}>
          <br />
          Players
          <br />
          {players.map(player => (
            <Player key={player.id} player={player} />
          ))}
          <div className="clearfix" />
        </div>
        <span className={style.timestamp}>{time}</span>
        <div className="clearfix" />
      </div>
    </div>
  );
}
