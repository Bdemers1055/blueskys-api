import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        city: {},
        st: {},
        address: '',
        forecast: {},
        success: false,
        error: null,
      };
    }
      componentDidMount(){
        this.fetchForecast();
      }
      displayAddress(e){
          this.setState({
              address: e.target.value
          });
      }
      fetchGeolocation(){
        const address = this.state.address;
        const url = `http://localhost:9009/forecast/location/address/${address}`;
        axios.get(url).then((response) => {
            this.setState({
                geolocation: response.data,
                success: true,
            });
        }).catch((error) => {
            this.setState({
                success: false,
                error,
            });
      });
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
          <h1 className="App-title">Rain Check</h1>
        </header>
        {/* <p className="App-intro">
          <input className="latInput" type="text"></input>
          <input  className="lonInput" type="text"></input>
          <button>Go</button>
        </p> */}
        <input className="address" 
               type="text" 
               value={this.state.address}
               onChange={this.displayAddress.bind(this)}
              />
                <button type="button" onClick={this.displayAddress.bind(this)}>display Address</button>
                <button type="button" onClick={this.fetchGeolocation.bind(this)}>fetch Geolocation</button>
                <div>{this.state.address}</div>
                <pre>{JSON.stringify(this.state.geolocation,null,4)}</pre>
        <button type="button" onClick={this.fetchForecast.bind(this)}>get forecast</button>
        <section>
          <h1>Current Rain Status</h1>
        <div className="forecastCard">{forecast.currently ?forecast.currently.precipProbability:null}</div>
        <h1>Probability of rain in the next hour</h1>
        <div className="forecastCard">{forecast.hourly ?forecast.hourly.data[1].precipProbability:null}</div>
        <h1>Probability of rain tomorrow</h1>
        <div className="forecastCard">{forecast.daily ?forecast.daily.data[1].precipProbability:null}</div>
      </section>
      </div>
    );
  }
}

export default App;
