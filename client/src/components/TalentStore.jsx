import React from 'react';
import data from '../../../talent-store-data.js';

const TalentStore = (props) => {
  return (
    <div className="talent-store">
      <span className="talent-store-title">Talent Store</span>
      <br />
      {data.map((item) => {
        return (
          <div>
            <span className= "talent-name">{item.name}</span>
            <br />
            <span className="form-name">Cost:</span> {item.cost}
            <br />
            <span className="form-name">Description:</span>  {item.desc}
            <br />
            <button className="buy-button" onClick={() => {
              if (item.cost > props.state.exp) {
                alert(`Not enough exp!`);
              } else {
                props.buy(item.cost, item.name)
                props.onClick();
                alert(`purchased ${item.name}!`)
              }
            }}>Buy</button>
          </div>
        )
      })}
      <button className="buy-button" onClick={props.onClick}>Close Store</ button>
    </div>
  )
}

export default TalentStore;