import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import axios from 'axios'

class Popup extends React.Component {
  constructor() {
    super()
    this.state = {
      trackUrl: '',
      trackName: '',
      // status: ''
    }
    this.saveClick = this.saveClick.bind(this)
  }

  async componentDidMount() {
    let app = this

    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeWindow = tabs[0]
      let url = activeWindow.url
      let name = activeWindow.title

      app.setState({
        trackUrl: url,
        trackName: name
      })
    })

  }

  async saveClick() {
    await axios.post('http://localhost:3010/api/tracks', this.state)
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <p className="trackName">{this.state.trackName}</p>
          <button onClick={this.saveClick}>Save to my Queue</button>
          <p>{this.state.status}</p>
        </header>
      </div>
    );
  }
};

export default Popup;

