import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        forecast: {},
        success: false,
        error: null,
      };
    }
      componentDidMount(){
        this.fetchForecast();
      }
      fetchForecast(){
        const lat = 29.1;
        const lon = -82;
        const url = `http://localhost:9009/forecast/location/${lat},${lon}`;
        axios.get(url).then((response) => {
            this.setState({
                forecast: response.data,
                success: true,
            });
        }).catch((error) => {
            this.setState({
                success: false,
                error,
            });
      });
      }      
  render() {
    const { success, error, forecast } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Forecast</h1>
        </header>
        {/* <p className="App-intro">
          <input className="latInput" type="text"></input>
          <input  className="lonInput" type="text"></input>
          <button>Go</button>
        </p> */}
        <button type="button" onClick={this.fetchForecast.bind(this)}>get forecast</button>
        <section>
        <div className="forecastCard">{forecast.currently ?forecast.currently.precipProbability:null}</div>
      </section>
      </div>
    );
  }
}

export default App;
