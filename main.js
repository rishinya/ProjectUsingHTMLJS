

async function queryCountries(e) {

    e.preventDefault()

    let query =  document.getElementById("countryStr").value;
    let container = document.getElementById("country-container");

    console.log("Query countries", query)
    container.innerHTML = '';
    // for fetching data
    var response;
    try{
        response = await fetch(`https://restcountries.eu/rest/v2/name/${query}`);
        const json = await response.json();
        container.innerHTML =
        json.map(createArticle).join('\n');
    }catch(e){
        container.innerHTML = '<h1> CRAP...NO COUNTRY IS FOUND WITH THE GIVEN SEARCH RESULT</h1>'
        console.log("error", e)
    }

    
}


function createArticle(country) {
    return `
        <div class="country-card" id="${country.alpha3Code}" onclick="goToDetailsPage('${country.alpha3Code}')">
            <span>Name: ${country.name}</span>
            <br>
            <span>Capital: ${country.capital}</span>
            <br>
            Flag: 
            <br>
            <img src="${country.flag}" alt="${country.name}">
        </div>
    `;
}

async function goToDetailsPage(data){
    let val = document.getElementById(data).id
    console.log("Detail", data, val)

    // for fetching data
    const response = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${data}`);
    const json = await response.json();
    localStorage.setItem("country", JSON.stringify(json[0]))
    location.href = "/countrydetails.html"
}

function backTo(){
    location.href = "/"
}

function displayCountryDetails(){
    let country = JSON.parse(localStorage.getItem("country"))
    console.log("countryyyyy", country)
    let container = document.getElementById("details-page");
    container.innerHTML = `
        <div style="text-align:center">
            <h3>${country['name']}
            <img src="${country.flag}" width="30px" height="20px" alt="${country.name}">
            </h3>
            <table>
                <tr>
                    <td>Name</td>
                    <td>${country['name']}</td>
                </tr>
                <tr>
                    <td>Capital</td>
                    <td>${country['capital']}</td>
                </tr>
                <tr>
                    <td>Country Code</td>
                    <td>${country['alpha3Code']}</td>
                </tr>
                <tr>
                    <td>Top Level Domain Code</td>
                    <td>${country['topLevelDomain']}</td>
                </tr>
                <tr>
                    <td>Calling Code</td>
                    <td>${country['callingCodes']}</td>
                </tr>
                <tr>
                    <td>Region</td>
                    <td>${country['region']}</td>
                </tr>
                <tr>
                    <td>Population</td>
                    <td>${country['population']}</td>
                </tr>
                <tr>
                    <td>Timezones</td>
                    <td>${country['timezones']}</td>
                </tr>
                <tr>
                    <td>Native Name</td>
                    <td>${country['nativeName']}</td>
                </tr>
                <tr>
                    <td>Alt Spellings</td>
                    <td>${country['altSpellings'].join(', ')}</td>
                </tr>
            </table>
        </div>
    `
}
