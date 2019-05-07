import React from 'react';

const Player = (props) => {
  console.log(props.player)
  return (
    <div>
    Character Name: {props.player.charName}
    Talents: {props.player.talents.map((talent) => {
      return <span className="talent">{talent}</span>
    })}
    Quests: {props.player.talents.map((quest) => {
      return <span className="quest">{quest}</span>
    })}
    Exp: {props.player.exp}
  </div>
  )
}

export default Player;