import React, {Component} from 'react';
import JokeService from '../service/JokeService'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        jokes: {},
        eelPics: {}
    }
    this.retrieveJokes = this.retrieveJokes.bind(this);
  }

  retrieveJokes() {
    JokeService.getAll()
      .then(response => {
        this.setState({
          jokes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
