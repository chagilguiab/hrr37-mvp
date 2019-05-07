import React from 'react';

const Console = (props) => (
  <div>
    <form>
      <label>Add New Player: &nbsp;&nbsp;
        <input
          type="text"
          name="name"
          onChange={props.handleChange}
          />
      </label>&nbsp;&nbsp;
      <button className="submit-button" onClick={props.handleClick}>Submit</button>
    </form>
    <select onChange={props.setPlayer}>
      {props.players.map((player, idx) => {
        return <option key={idx} value ={player.name}> {player.name} </option>
      })}
    </select>
  </div>
)

export default Console;