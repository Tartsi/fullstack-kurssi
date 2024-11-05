const Listing = ({ countries }) => {

    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )    
    }
    
    const renderCountryDetails = (country) => {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <br />
                <p>capital: {country.capital}</p>
                <p>area: {country.area}</p>
                <br />
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`} 
                    width="100" 
                    height="100"
                />
            </div>
        )
    }

    if (countries.length === 1) {
        return renderCountryDetails(countries[0])
    }

    return (
        <div>
            {countries.map((country, index) => (
                <div key={index}>
                    <p>{country.name.common}</p>
                </div>
            ))}
        </div>
    )
}

export default Listing