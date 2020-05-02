import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

class Popup extends React.Component {
  constructor() {
    super()
    this.state = {
      url: '',
      title: '',
      status: ''
    }
    this.saveClick = this.saveClick.bind(this)
  }

  async saveClick() {
    let math = Math.floor(Math.random() * Math.floor(188))
    let app = this

    // await chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   let activeWindow = tabs[0]
    //   let url = activeWindow.url
    //   let title = activeWindow.title

    //   app.setState({
    //     status: 'saved!',
    //     url: url,
    //     title: title,
    //   })
    // })

    const request = new XMLHttpRequest()
    await request.open('GET', 'https://cat-fact.herokuapp.com/facts', true)
    request.onload = function () {
      const data = JSON.parse(this.response)
      const fact = data.all[math].text
      app.setState({
        status: fact
      })
    }
    request.send()
    console.log(this.state)
  }


  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.saveClick}>Save this Track</button>
          <p>{this.state.status}</p>
        </header>
      </div>
    );
  }
};

export default Popup;

