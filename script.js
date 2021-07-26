// function to sort countries by name
function sortByName(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  }
  
  function getCountries() {
    fetch("https://restcountries.eu/rest/v2/all", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((countries) => countries.sort(sortByName))
      .then((sortedCountries) => {
        const countryList = document.querySelector(".country-list");
        let previousFirstLetter = "";
        sortedCountries.forEach((country) => {
          const countryContainer = document.createElement("div");
          countryContainer.className = "container";
          let currentFirstLetter = country.name[0];
          // console.log('Before', {currentFirstLetter,previousFirstLetter, name: country.name});
  
          if (previousFirstLetter != currentFirstLetter) {
            const countryHeading = document.createElement("div");
            countryHeading.className = "heading";
            countryHeading.innerHTML = `<h2>${currentFirstLetter}</h2>`;
            countryList.append(countryHeading);
            previousFirstLetter = currentFirstLetter;
            // console.log('After', {currentFirstLetter,previousFirstLetter, name: country.name});
          }
  
          countryContainer.innerHTML = `
          <div>
            <img class="country-flag" src=${country.flag} alt="country flag">
          </div>
          <div class="country-details">
            <h2>${country.name} </h2>
            <p> <span class="country-details-heading">Population:</span> ${country.population} </p>
            <p> <span class="country-details-heading">Region:</span>${country.region}</p>
            <p><span class="country-details-heading">Capital:</span>${country.capital}</p>
          </div>
          `;
          countryList.append(countryContainer);
        });
      });
  }
  
  getCountries();
  
  