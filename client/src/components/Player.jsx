import React from 'react';

const Player = (props) => {

  let editButtonText;
  let DOMNode;
  let talents = '';
  props.state.talents.forEach((talent, idx) => {
    return idx === props.state.talents.length - 1 ? talents += talent : talents += talent + ', ';
  })

  let quests = '';
  props.state.quests.forEach((quest, idx) => {
    return idx === props.state.quests.length - 1 ? quests += quest : quests += quest + ', ';
  })
  if (props.canEdit) {
    editButtonText = 'Read Only';
    DOMNode =
    <form>
      <label>Character Name:
        <input
          type="text"
          name="charName"
          onChange={props.handleChange}
          value={props.state.charName}
          />
      </label>
      <br />
      <label>Talents:
        <input
          type="text"
          name="talentsString"
          onChange={props.handleChange}
          value={props.state.talentsString}
          />
      </label>
      <br />
      <label>Quests:
        <input
          type="text"
          name="questsString"
          onChange={props.handleChange}
          value={props.state.questsString}
          />
      </label>
      <br />
      <label>EXP:
        <input
          type="number"
          name="exp"
          onChange={props.handleChange}
          value={props.state.exp}
          />
      </label>
    </form>
  } else {
    editButtonText = 'Edit'
    DOMNode =
    <div>
      <span className="charStat">Character Name: {props.state.charName}</span>
      <br />
      <span className="charStat">Talents: {props.state.talentsString}</span>
      <br />
      <span className="charStat">Quests: {props.state.questsString}</span>
      <br />
      <span className="charStat">EXP:{props.state.exp}</span>
    </div>
  }

  return (
    <div>
      <button onClick={props.toggleEdit}>{editButtonText}</button>
      {DOMNode}
    </div>
  )
}

export default Player;