import React from 'react';
import data from '../../../talent-store-data.js';

const TalentStore = (props) => {
  return (
    <div>
      TalentStore
      <br />
      {data.map((item) => {
        return (
          <div>
            {item.name}
            <br />
            Cost: {item.cost}
            <br />
            Description: {item.desc}
            <button onClick={() => {
              if (item.cost > props.state.exp) {
                alert(`Not enough exp!`);
              } else {
                props.buy(item.cost, item.name)
              }
            }}>Buy</button>
          </div>
        )
      })}
      <button onClick={props.onClick}>Close Store</ button>
    </div>
  )
}

export default TalentStore;