import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: 0,
        lng: 0,
        address: '',
        geolocation: '',
        forecast: {},
        success: false,
        error: null,
      };
    }
      fetchGeolocationAndForecast(){
        this.fetchGeolocation();
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
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng, 
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
        const lat = this.state.lat;
        const lng = this.state.lng;
        const url = `http://localhost:9009/forecast/location/${lat},${lng}`;
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
    const { forecast } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">CHANCE OF RAIN</h1>
          <input className="address" 
               type="text"
               placeholder="City, State" 
               value={this.state.address}
               onChange={this.displayAddress.bind(this)}/>
        <button type="button" onClick={this.fetchGeolocationAndForecast.bind(this)}>CHECK RAIN FORECAST</button>
        </header>
        {/* <section>
        <input className="address" 
               type="text"
               placeholder="City, State" 
               value={this.state.address}
               onChange={this.displayAddress.bind(this)}/>
        <button type="button" onClick={this.fetchGeolocationAndForecast.bind(this)}>CHECK RAIN FORECAST</button>
        </section> */}
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
