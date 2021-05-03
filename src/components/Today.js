import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';

const Today = ({ hourlyWeather }) => {
  const copyHourlyWeather = [...hourlyWeather]
    .slice(0, 24)
    .filter((hour) => moment(hour.startTime) >= moment());

  const highTemp = copyHourlyWeather.reduce((accumulator, hour) => {
    if (hour.temperature > accumulator) accumulator = hour.temperature;
    return accumulator;
  }, -Infinity);

  const lowTemp = copyHourlyWeather.reduce((accumulator, hour) => {
    if (hour.temperature < accumulator) accumulator = hour.temperature;
    return accumulator;
  }, Infinity);

  return (
    <div>
      {copyHourlyWeather.map((hour, idx) => {
        if (idx === 0) {
          return (
            <Card key={hour.number}>
              <Card.Title>Current Weather</Card.Title>
              <li>{hour.temperature}°</li>
              <li>
                {hour.windSpeed} {hour.windDirection}
              </li>
              <li>{hour.shortForecast}</li>
              <li>High {highTemp}°</li>
              <li>Low {lowTemp}°</li>
            </Card>
          );
        }
        return (
          <Card key={hour.number}>
            <Card.Title>{moment(hour.startTime).format('dddd ha')}</Card.Title>
            <li>{hour.temperature}°</li>
            <li>
              {hour.windSpeed} {hour.windDirection}
            </li>
            <li>{hour.shortForecast}</li>
          </Card>
        );
      })}
    </div>
  );
};

export default Today;
