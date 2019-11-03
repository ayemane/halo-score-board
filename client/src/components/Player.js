import React from "react";
import style from "../styles/Player.scss";

export default function Player({ player: { id } }) {
  return <span className={style.player}>{id}</span>;
}
