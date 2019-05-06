import React from 'react';
import axios from 'axios';
import Console from './Console.jsx';
// import Player from './Player';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      players: [],
      player1: null,
      player2: null,
      player3: null,
      player4: null,
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
    }, () => {console.log(this.state)});
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

  render () {
    return (
      <div>
        <Console
          players={this.state.players}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          />
        {this.state.player1 ? <Player player={this.state.player1} /> : null}
        {this.state.player2 ? <Player player={this.state.player2} /> : null}
        {this.state.player3 ? <Player player={this.state.player3} /> : null}
        {this.state.player4 ? <Player player={this.state.player4} /> : null}
      </div>
    )
  }
}

export default Home;