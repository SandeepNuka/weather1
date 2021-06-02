import React, { Component } from "react";
import Weather from "./components/wether.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import Form from "./components/form.component";

const Apikey = "4247723607fb53faf9465b394958111e";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weathericon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }
  calCulateCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  get_weather(icons, rangeid) {
    switch (true) {
      case rangeid >= 200 && rangeid <= 232:
        this.setState({ icon: this.weathericon.Thunderstorm });
        break;
      case rangeid >= 300 && rangeid <= 321:
        this.setState({ icon: this.weathericon.Drizzle });
        break;

      case rangeid >= 500 && rangeid <= 531:
        this.setState({ icon: this.weathericon.Rain });
        break;
      case rangeid >= 600 && rangeid <= 622:
        this.setState({ icon: this.weathericon.Snow });
        break;
      case rangeid >= 701 && rangeid <= 781:
        this.setState({ icon: this.weathericon.Atmosphere });
        break;
      case rangeid === 800:
        this.setState({ icon: this.weathericon.Clear });
        break;
      case rangeid >= 801 && rangeid <= 804:
        this.setState({ icon: this.weathericon.Clouds });
        break;
      default:
        this.setState({ icon: this.weathericon.Clouds });
    }
  }

  getweather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Apikey}`
      );
      const responce = await api_call.json();
      console.log(responce);

      this.setState({
        city: responce.name,
        country: responce.sys.country,
        celsius: this.calCulateCelsius(responce.main.temp),
        temp_max: this.calCulateCelsius(responce.main.temp_max),
        temp_min: this.calCulateCelsius(responce.main.temp_min),
        description: responce.weather[0].description,
      });
      this.get_weather(this.weathericon, responce.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getweather} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_crlsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          temp_celsius={this.state.celsius}
          description={this.state.description}
          weathericon1={this.state.icon}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
