import { useEffect, useState } from "react"
import Form from "./components/Form"
import countriesServices from "./services/countries"
import Countries from "./components/Countries";
import weatherService from "./services/weather";
function App() {
  const [value, setValue] = useState("");
  const [listCountries, setListContries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [weatherData, setWeaderData] = useState({});
  const [iconValue, setIconValue] = useState("");
  const handleOnChange = (event) => {
    setValue(event.target.value)
  }

  const handleCountryOnClick = (nameCountry) => (event) => {
    const filterCountries = listCountries.filter(country => country.name.common.toLowerCase() === nameCountry.toLocaleLowerCase());
    setCountriesToShow(filterCountries);
    if (filterCountries.length === 1) {
      const capital = filterCountries[0].capital[0];
      weatherService.getInformationCapital(`weather?q=${capital}`).then(weather => {
        setWeaderData(weather);
        const icon = weather.weather[0].icon;
        setIconValue(icon);
      })
    }
  }

  useEffect(() => {
    if (listCountries && value) {
      const filterCountries = listCountries.filter(country => country.name.common.toLowerCase().includes(value.toLocaleLowerCase()));
      setCountriesToShow(filterCountries);
      if (filterCountries.length === 1) {
        const capital = filterCountries[0].capital[0];
        weatherService.getInformationCapital(`weather?q=${capital}`).then(weather => {
          setWeaderData(weather);
          const icon = weather.weather[0].icon;
          setIconValue(icon);
        })
      }
    }

  }, [value]);

  useEffect(() => {
    countriesServices.getAllCountries().then(contries => {
      setListContries(contries);
    });
  }, []);
  return (
    <div>
      <Form handleOnChange={handleOnChange} value={value} />
      <Countries
        countries={countriesToShow}
        validShowTocountrie={countriesToShow && countriesToShow.length > 1}
        weather={weatherData}
        iconValue={iconValue}
        handleOnClick={handleCountryOnClick}
      />
    </div>
  )
}

export default App
