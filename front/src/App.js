import React, { Component } from 'react';
import _ from 'lodash';
import logo from './image/banner.png';
import './App.css';

class App extends Component {
  state={
    InputData: '',
    OutputData: '',
  };

  handleClick = async(header = null, body) => {
    console.log('this', this.state);
      // const _deviceId = Helper._getDeviceID();
      // const auth = await Helper._getToken(); // get user access token after login or register.	
      let defaultHeader = {
        'Content-Type': 'application/json',
        // 'X-GT-Session-ID': _deviceId, // device of machine
        // 'X-GT-Request-ID': APP_KEY, //
        // 'X-Requested-With': 'XMLttpRequest',
      };
      // if ((url !== '/api/auth/login')) {
      //   defaultHeader = _.extend({
      //     Authorization: 'Bearer ' + auth,
      //   }, defaultHeader);
      // }
    
      const Url =  '';
      const _header = header
        ? _.extend(header, defaultHeader)
        : defaultHeader;
      return fetch(Url, {
        method: 'POST',
        headers: _header,
        body: _.isObject(body)
          ? JSON.stringify(body)
          : body,
      })
      .then(response => response.json())
      .then((responseJson) =>	{
        return responseJson;
      })
      .catch((error) => { console.log(error); });
      console.log('this.', this.state.InputData);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <body className="App-body">
          <div className="Row">
            <div className="Text-Area">
              <textarea
                name="message"
                className="textarea"
                placeholder="Please Input your document..."
                value={this.state.InputData}
                onChange={(e) => this.setState({InputData: e.target.value})}
              />
            </div>
            <div className="BtnClassify">
              <button type="button" onClick={() => this.handleClick()} className="btn">
                <div className="center">
                  <h5>ENTER</h5>
                  <div className="triangle" />
                </div>
              </button>
            </div>
            <div className="Text-Area">
              <textarea
              name="message"
              className="textarea"
              placeholder="Here your result..."
              readOnly
              value={this.state.OutputData}
            />
            </div>    
          </div>

        </body>
      </div>
    );
  }
}

export default App;
