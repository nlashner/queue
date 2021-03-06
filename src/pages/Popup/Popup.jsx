import React from 'react';
import './Popup.css';
import axios from 'axios'
import Queue from './Queue'
import qlogoWhite from '../../assets/img/qlogoWhite.png'



class Popup extends React.Component {
  constructor() {
    super()
    this.state = {
      trackUrl: '',
      trackName: '',
      status: '',
      tracks: []
    }
    this.saveClick = this.saveClick.bind(this)
    this.getQueue = this.getQueue.bind(this)
    this.clearQueue = this.clearQueue.bind(this)
  }

  async componentDidMount() {
    let app = this

    await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let activeWindow = tabs[0]
      console.log(activeWindow)
      let url = activeWindow.url
      let name = activeWindow.title
      let img = activeWindow.favIconUrl

      app.setState({
        trackUrl: url,
        trackName: name,
        trackImgUrl: img
      })
    })

  }

  async saveClick() {
    await axios.post('http://localhost:8080/api/tracks', {
      trackName: this.state.trackName,
      trackURL: this.state.trackUrl
    })
    this.setState({
      status: 'Saved!'
    })
  }


  async getQueue() {
    const data = await axios.get('http://localhost:8080/api/tracks')
    const tracks = data.data
    this.setState({
      tracks: tracks
    })
  }

  clearQueue() {
    this.setState({
      tracks: []
    })
    console.log('in clear', this.state)
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">

          <div className="logobox">
            <img src={qlogoWhite} alt="logo" className="logo"></img>
          </div>

          {this.state.tracks.length

            ?
            <Queue tracks={this.state.tracks} clearQueue={this.clearQueue} />

            :
            <div>
              {/* <img src="https://cdn0.iconfinder.com/data/icons/music-86/512/music04-512.png" className="image" alt="track"></img> */}


              <p className="trackName">{this.state.trackName}</p>


              <p>{this.state.status}</p>

              <div className="buttonDiv">
                <button type="button"
                  className="button"
                  onClick={this.saveClick}>
                  Save to my Queue
              </button>

                <button type="button"
                  className="button"
                  onClick={this.getQueue}>
                  See my Queue
              </button>
              </div>
            </div>
          }

          <a href="http://localhost:8080/" target="_blank" className="gohome">go to Queue home</a>

        </header>
      </div>
    );
  }
};

export default Popup;

