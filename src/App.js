import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from './components/Tabs';
import Today from './components/Today';
import './App.css';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Searchbar from './Searchbar';
import Weekly from './components/Weekly';
import Favorites from './components/Favorites';
import FavoriteButton from './components/FavoriteButton';

const App = () => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const localFavorites = await JSON.parse(
          localStorage.getItem('favorites')
        );
        setFavorites(localFavorites);

        if (location) {
          const result = await axios(
            `https://api.weather.gov/points/${latitude},${longitude}`
          );

          const hourlyData = await axios(
            `https://api.weather.gov/gridpoints/${result.data.properties.gridId}/${result.data.properties.gridX},${result.data.properties.gridY}/forecast/hourly`
          );
          setHourlyWeather(hourlyData.data.properties.periods);

          const weeklyData = await axios(
            `https://api.weather.gov/gridpoints/${result.data.properties.gridId}/${result.data.properties.gridX},${result.data.properties.gridY}/forecast`
          );
          setWeeklyWeather(weeklyData.data.properties.periods);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleChange = (ev) => {
    setAddress(ev);
  };

  const handleSelect = async (ev) => {
    try {
      const results = await geocodeByAddress(ev);
      setAddress('');
      const latLng = await getLatLng(results[0]);
      setLatitude(latLng.lat.toFixed(4));
      setLongitude(latLng.lng.toFixed(4));
      setLocation(results[0].formatted_address);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const addOrRemoveFavorite = (ev) => {
    if (favorites.includes(ev)) {
      setFavorites(favorites.filter((favorite) => favorite !== ev));
    } else {
      setFavorites([...favorites, ev]);
    }
  };

  return (
    <div>
      <h1>{location}</h1>
      <FavoriteButton
        favorites={favorites}
        location={location}
        addOrRemoveFavorite={addOrRemoveFavorite}
      />
      <Favorites favorites={favorites} handleSelect={handleSelect} />
      <Searchbar
        address={address}
        handleChange={handleChange}
        handleSelect={handleSelect}
      />
      <Tabs>
        <div label="Today">
          <Today hourlyWeather={hourlyWeather} />
        </div>
        <div label="7-Day Forecast">
          <Weekly weeklyWeather={weeklyWeather} />
        </div>
      </Tabs>
    </div>
  );
};

export default App;
