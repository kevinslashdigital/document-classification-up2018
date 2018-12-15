import React, { Component } from 'react';
import _ from 'lodash';
// import logo from 'https://vichhaiy.files.wordpress.com/2013/01/010813_0312_universityo1.png';
import './App.css';

class App extends Component {
  state={
    InputData: '',
    OutputData: '',
    emptyData: false,
    isHaveData: false,
    pendding: false,
  };

  handleClick = async(header = null) => {
    if (!this.state.InputData) {
      this.setState({
        emptyData: true,
        OutputData: '',
      }, () => {
        setTimeout(() => {
          this.setState({
            emptyData: false,
          })
        }, 2000);
      });
      return;
    }
    this.setState({
      isHaveData: true,
      OutputData: '',
    });
    const body = {
      doc: this.state.InputData
    };
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
      const Url =  'http://127.0.0.1:5000/classify';
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
        this.setState({
          isHaveData: false,
          pendding: true,
        }, () => {
          setTimeout(() => {
            this.setState({
              pendding: false,
              OutputData: `The result is ${responseJson.prediction.toUpperCase()}` || '',
            });
          }, 1000);
        });
      })
      .catch((error) => { console.log(error); });
  }

  handleClear = () => {
    this.setState({
      InputData: '',
      OutputData: '',
    });
  }

  render() {
    let placeholder2 = 'Result...';
    const placeholder1 = this.state.emptyData ? 'Please input your document !!!' : 'Document here...';
    if (this.state.isHaveData) {
      placeholder2 = 'Compilation...';
    } else if (this.state.emptyData) {
      placeholder2 = 'No document found !!!';
    } else if (this.state.pendding) {
      placeholder2 = 'The result is ...'
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://vichhaiy.files.wordpress.com/2013/01/010813_0312_universityo1.png' className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <body className="App-body">
          <div className="Row">
            <div className="Text-Area">
              <textarea
                name="message"
                className="textarea"
                placeholder={placeholder1}
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
              <button type="button" onClick={() => this.handleClear()} className="btnClear">
                <div className="center">
                  <h5>CLEAR</h5>
                </div>
              </button>              
            </div>
            <div className="Text-Area">
              <textarea
              name="message"
              className="textarea"
              placeholder={placeholder2}
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
