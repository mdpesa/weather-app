import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');
  const handleCityChange = useCallback((city) => {
    console.log('city:', city);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0963d77f0f3a60fd604bcde9b5596630&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };
        setWeather(weatherData);
      });
  }, []);
  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && <WeatherSummary {...weather} />}
      <Loader />
    </section>
  );
};

export default WeatherBox;
