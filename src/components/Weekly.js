import React from 'react';
import Card from 'react-bootstrap/Card';

const Weekly = ({ weeklyWeather }) => {
  const copyWeeklyWeather = [...weeklyWeather];

  return (
    <div>
      {copyWeeklyWeather
        .filter((day) => !day.name.includes('Night'))
        .map((day) => {
          return (
            <Card key={day.number}>
              <Card.Title>{day.name}</Card.Title>
              <li>{day.temperature}°</li>
              <li>
                {day.windSpeed} {day.windDirection}
              </li>
              <li>{day.shortForecast}</li>
            </Card>
          );
        })}
    </div>
  );
};

export default Weekly;
