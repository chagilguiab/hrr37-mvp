import React from 'react';
import axios from 'axios';
import Console from './Console.jsx';
import Player from './Player.jsx';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      players: [],
      playerData: null,
      name: '',
      charName:'',
      talents: [],
      quests: [],
      exp: 0,
      edit: false,
      talentsString: '',
      questsString: ''
    }

    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updatePlayerStats = this.updatePlayerStats.bind(this);
  }

  componentDidMount () {
    this.updatePlayers();
  }

  updatePlayers (callback) {
    axios.get('http://localhost:3003/players')
    .then((data) => {
      this.setState({players: data.data})
    })
    .then(() => {
      if (callback) {
        callback();
      } else {
        return;
      }
    })
  }

  toggleEdit () {
    this.setState({edit: !this.state.edit});
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(e) {
    e.preventDefault();

    let newPlayer = {
      "id": this.state.players.length,
      "name": this.state.name,
      "charName": this.state.charName,
      "talents": this.state.talents,
      "quests": this.state.quests,
      "exp": this.state.exp
    }

    axios.post('http://localhost:3003/players', newPlayer)
    .then(() => {
      alert(`${newPlayer.name} added!`);
      this.updatePlayers(() => {this.setPlayer(null, newPlayer.name)});
    })
  }

  setPlayer (e, newPlayer) {
    let targetPlayerName = newPlayer|| e.target.value;

    this.state.players.forEach((player) => {
      if (player.name === targetPlayerName) {
        this.setState({playerData: player}, () => {
          for (let key in player) {
            this.setState({[key]: player[key]}, () => {
              let talentsString = '';
              let questsString = '';
              this.state.talents.forEach((talent, idx) => {return idx === this.state.talents.length - 1 ? talentsString += talent : talentsString += talent + ', '})
              this.state.quests.forEach((quest, idx) => {return idx === this.state.quests.length - 1 ? questsString += quest : questsString += quest + ', '})
              this.setState({talentsString: talentsString, questsString: questsString})
            })
          }
        })
      }
    })

  }

  updatePlayerStats () {
    let id = this.state.playerData.id;
    let playerStats = {
      "name": this.state.name,
      "charName": this.state.charName,
      "talents": this.state.talentsString.split(', '),
      "quests": this.state.questsString.split(', '),
      "exp": this.state.exp
    }

    axios.put(`http://localhost:3003/players/${id}`, playerStats)
    .then(() => {
      this.updatePlayers();
    })
    .then(() => {
      alert(`Changes submitted!`);
      this.setState({edit: false});
    })
  }

  render () {
    return (
      <div>
        <Console
          setPlayer={this.setPlayer}
          players={this.state.players}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          />
        {this.state.playerData
          ? <Player
              state={this.state}
              toggleEdit={this.toggleEdit}
              canEdit={this.state.edit}
              handleChange={this.handleChange}
              updatePlayerStats={this.updatePlayerStats}
            />
          : null}
      </div>
    )
  }
}

export default Home;