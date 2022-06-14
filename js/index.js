const cityInput = document.getElementById("cityInputText");
const apipToken={
    "key":"19ebeb4881b3c1f6e888785fa3a13787"
};
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

cityInput.addEventListener('keyup',(event)=>{
    if(event.key == 'Enter'){
        getWeatherInfo();
    }
});

let finalWeatherInfo;
function getWeatherInfo(){
    console.log(cityInput);
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apipToken.key}&units=metric`;
    console.log(api);
    
    fetch(api)
            .then(response=> {
        console.log(response.ok);
        if(response.ok){
            return response.json()
        }else{
            console.log("Error: invalid City")
        }
    })
    .then(data => {
        updateWeatherInfo(data);
    })
    .catch(function(error){
        console.log(Error.message)
    });
}

function updateWeatherInfo(finalWeatherInfo){
    let cityTextElement = document.getElementById("cityText");
    let dateTextElement = document.getElementById("dateText");
    let tempElement = document.getElementById("temp");
    let tempDescriptionElement = document.getElementById("tempDescription");
    let lowHighTempElement = document.getElementById("lowHighTemp");
    
    var date = new Date();
    cityTextElement.innerHTML = `${finalWeatherInfo.name}, ${finalWeatherInfo.sys.country}`;
    
    dateTextElement.innerHTML = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    
    tempElement.innerHTML = `${finalWeatherInfo.main.temp}&deg;C`;
    
    tempDescriptionElement.innerHTML = finalWeatherInfo.weather[0].main;
    
    lowHighTempElement.innerHTML = `${finalWeatherInfo.main.temp_min}&deg;C / ${finalWeatherInfo.main.temp_max}&deg;C`;
    
    
}