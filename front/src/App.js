import React, { Component } from 'react';
import logo from './image/banner.png';
import './App.css';

class App extends Component {
  state={};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <body class="App-body">
          <div className="Row">
            <div className="Text-Area">
              <textarea name="message" className="textarea" placeholder="Please Input your document..." />
            </div>
            <div className="BtnClassify">
              <button type="button" onclick="alert('Hello World!')" className="btn">
                <div className="center">
                  <h5>ENTER</h5>
                  <div className="triangle" />
                </div>
              </button>
            </div>
            <div className="Text-Area">
              <textarea name="message" className="textarea" placeholder="Here your result..." />
            </div>    
          </div>

        </body>
      </div>
    );
  }
}

export default App;
