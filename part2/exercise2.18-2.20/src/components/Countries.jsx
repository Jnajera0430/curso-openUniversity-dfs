const Countries = ({ countries, validShowTocountrie, weather, iconValue, handleOnClick }) => {
    if (!countries) return null;
    if (countries.length > 10) return <div>Too many matches, specify another filter</div>;
    return (
        <div>
            {
                countries.map((country) => {
                    const listLanguages = Object.keys(country.languages);
                    return (
                        <div key={country.cca2}>
                            {validShowTocountrie ? (
                                <div>
                                    {country.name.common} <button onClick={handleOnClick(country.name.common)}>show</button>
                                </div>
                            ) : (
                                <div>
                                    <h1>
                                        {country.name.common}
                                    </h1>
                                    <div>capital {country.capital.map(item => `${item} `)}</div>
                                    <div>area {country.area}</div>
                                    <h2>languages:</h2>
                                    <ul>
                                        {listLanguages.map(language => <li key={language}>{country.languages[language]}</li>)}
                                    </ul>
                                    <img src={country.flags.png} alt={`Image of ${country.name.common}`} />

                                    <h2>Weather in {country.capital[0]}</h2>
                                    <div>
                                        temperature {(weather?.main?.temp - 273.15).toFixed(2)} Celcius
                                    </div>

                                    <div>
                                        {
                                            iconValue && (
                                                <img src={`https://openweathermap.org/img/wn/${iconValue}@2x.png`} alt="" />
                                            )
                                        }
                                    </div>
                                    <div>
                                        wind {weather?.wind?.speed} m/s
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Countries;