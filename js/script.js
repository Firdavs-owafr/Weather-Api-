let weatherBlock = document.querySelector('.weather');
let inputSerach = document.querySelector('.input-serach');
let btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    loadWeather()
    getWeather(inputSerach.value)
})

async function loadWeather(e) {
    weatherBlock.innerHTML =`
        <div class="loading">
            <img src="img/spinner.gif" alt="Loading...">
        </div>;
    `    
    // 
    // let server = 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputSerach.value}&appid=522f7ec766b55c89fccbc47a4e7a72c0`,{
        method: 'GET',
    });
    const responseResult = await response.json();

    
    if(response.ok){
        getWeather(responseResult)
    } else {
        weatherBlock.innerHTML = 'This city does not exist';
    }
}
function getWeather(data) {

    // console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
        <div class="weather-header">
            <div class="weather-main">
                <div class="city">${location}</div>
                <div class="status">${weatherStatus}</div>
        </div>
            <div class="weather-icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="temp">${temp}&deg;</div>
        <div class="feels">Feels Like: ${feelsLike}&deg;</div>
 `;
 weatherBlock.innerHTML = template;
}


