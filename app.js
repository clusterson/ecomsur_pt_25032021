const countryList = document.getElementById('countryList');

const searchBar = document.getElementById('searchBar');

let restCountries = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCountries =restCountries.filter(countrie => {
        return countrie.name.toLowerCase().includes(searchString) || 
        countrie.capital.toLowerCase().includes(searchString)
    });
    console.log(filteredCountries);
    displayCountries(filteredCountries);
});

const loadCountries = async () => {
    try {
        const res = await fetch('https://restcountries.eu/rest/v2/all');
        restCountries = await res.json();
        displayCountries(restCountries);
    } catch (err) {
        console.error(err);
    }
};

const displayCountries = (countries) => {
    const htmlString = countries

        .map((countries) => {
            return `
            <li class="country">
                <h2>${countries.name}</h2>
                <p><strong>Región:</strong> ${countries.region}
                <br> <strong> Borders:</strong> ${countries.borders}
                <br> <strong> Capital:</strong> ${countries.capital}
                <br> <strong> Language:</strong> ${countries["languages"][0].name}
                <br> <strong> Currency:</strong> ${countries["currencies"][0].name}
                <br> <strong> Currency Symbol:</strong> ${countries["currencies"][0].symbol}
                </p>
                <img src="${countries.flag}"></img>
            </li>
        `;
        })
        .join('');
    countryList.innerHTML = htmlString;
};

loadCountries();