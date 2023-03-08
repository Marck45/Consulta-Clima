// variaveis e seleções de eventos

const apiKey =  "6b34643c73530c5c7c305ed13ed1dde1"; 
const apiCountry = "https://flagsapi.com/";
const png = "/flat/64.png";

const cityinput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");


const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weathericonElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windelement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");


// Funções 
const getWeatherData = async (city) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    return data;
}




const showWeatherData = async (city) => {

    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weathericonElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountry + data.sys.country + png);
    umidityElement.innerHTML = data.main.humidity + "%";
    windelement.innerHTML = data.wind.speed + "Km/h";


    weatherContainer.classList.remove("hide");
};




// Eventos

searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const city = cityinput.value;

    showWeatherData(city);

});

cityinput.addEventListener("keyup", (e)=>{

    if(e.code === "Enter"){
        const city = e.target.value;

        showWeatherData(city);
    }

});