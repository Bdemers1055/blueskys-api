import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        appearance: 'none',
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
        this.displayForecastSection();
      }
      displayAddress(e){
          this.setState({
              address: e.target.value
          });
      }
      fetchGeolocation(){
        const address = this.state.address;
        const url = `/forecast/location/address/${address}`;
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
      displayForecastSection(){
          this.setState({
            appearance: 'block'
          });
      }
      fetchForecast(){
        const lat = this.state.lat;
        const lng = this.state.lng;
        const url = `/forecast/location/${lat},${lng}`;
        axios.get(url).then((response) => {
            this.setState({
                forecast: response.data,
                success: true,
            });
            window.forecast = response.data;
        }).catch((error) => {
            this.setState({
                success: false,
                error,
            });
      });
      }      
  render() {
    const styles = { display: this.state.appearance };
    const { forecast } = this.state;
    // const nexthour = {(forecast.hourly.data[0].time)};
    const date = moment(nexthour);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Check the propability of rain in your area</h1>
          <input className="address" 
               type="text"
               placeholder="Search by address" 
               value={this.state.address}
               onChange={this.displayAddress.bind(this)}/>
        <button type="button" onClick={this.fetchGeolocationAndForecast.bind(this)}>CHECK FOR RAIN</button>
        </header>
        <section className="forecastSection" style = { styles }>
        <h1 className="App-title">Chances of Rain</h1>
        <div className="forecastCard">
        <h1>{forecast.currently ?forecast.currently.precipProbability * 100 :0.0}%</h1>
        <p className="label">Currently</p>
        </div>
        
        <div className="forecastCard">
        <h1>{forecast.hourly ?forecast.hourly.data[0].precipProbability * 100:0.0}%</h1>
        {/* <p className="label">{forecast.hourly ?forecast.hourly.data[0].time * 1000:null}</p> */}
        <p className="label">{date.format("ddd, hA")}</p>
        </div>
        <div className="forecastCard">
        <h1>{forecast.daily ?forecast.daily.data[0].precipProbability * 100 :0.0}%</h1>
        <p className="label">Tomorrow</p>
        </div>
      </section>
      </div>
    );
  }
}

export default App;
