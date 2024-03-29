import React from "react";
const Weather = (props) => {
  return (
    <div className="container-fluid text-light">
      <div className="cards pt-4"> </div>
      <h1>
        {props.city}

        {"      "}
        {props.country}
      </h1>
      <h5 className="py-4">
        <i className={`wi ${props.weathericon1} display-1`} />
      </h5>
      {props.temp_celsius ? (
        <h1 className="py-2">{props.temp_celsius}&deg;</h1>
      ) : null}

      {/**show max and min temp */}
      {minmaxTemp(props.temp_min, props.temp_max)}
      <h4 className="py-3">{props.description} </h4>
    </div>
  );
};

function minmaxTemp(min, max) {
  if (min & max) {
    return (
      <h3>
        <span className="px-4">Min {min}&deg;</span>
        <span className="px-4">Max {max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
