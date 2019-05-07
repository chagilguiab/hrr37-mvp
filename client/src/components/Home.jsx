import React from 'react';
import axios from 'axios';
import Console from './Console.jsx';
import Player from './Player.jsx';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      players: [],
      currentPlayer: '',
      name: '',
      charName:'',
      talents: [],
      quests: [],
      exp: 0
    }

    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  componentDidMount () {
    this.updatePlayers();
  }

  updatePlayers () {
    axios.get('http://localhost:3003/players')
    .then((data) => {
      this.setState({players: data.data})
    });
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
      "id": this.state.players.length + 1,
      "name": this.state.name,
      "charName": this.state.charName,
      "talents": this.state.talents,
      "quests": this.state.quests,
      "exp": this.state.exp
    }

    axios.post('http://localhost:3003/players', newPlayer)
    .then(() => {
      this.updatePlayers();
    })
  }

  setPlayer (e) {
    let playerName = e.target.value;
    this.setState({currentPlayer: playerName}, () => {
      let currentPlayer;
      this.state.players.forEach((player) => {
        if (player.name === playerName) {
          currentPlayer = player;
        }
      })
      for (let key in currentPlayer) {
        if (key !== 'name') {
          this.setState({[key]: currentPlayer[key]}, () => {console.log(this.state)});
        }
      }
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
        {this.state.currentPlayer ? <Player player={this.state.currentPlayer} /> : null}
      </div>
    )
  }
}

export default Home;