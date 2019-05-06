import React from 'react';
import axios from 'axios';
import Console from './Console';
import Player from './Player';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      players: [],
      player1: null,
      player2: null,
      player3: null,
      player4: null,
      name: ''
    }

    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
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

  render () {
    return (
      <div>
        <Console players={this.state.players} />
        {this.state.player1 ? <Player player={this.state.player1} /> : null}
        {this.state.player2 ? <Player player={this.state.player2} /> : null}
        {this.state.player3 ? <Player player={this.state.player3} /> : null}
        {this.state.player4 ? <Player player={this.state.player4} /> : null}
      </div>
    )
  }
}

export default Home;