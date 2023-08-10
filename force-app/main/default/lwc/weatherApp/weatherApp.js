import { LightningElement, track } from 'lwc';

const API_KEY = '9d4d531b820c5c5d07db72fbcc475d58';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'

export default class WeatherApp extends LightningElement {
    clearIcon = WEATHER_ICONS+'/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS+'/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS+'/weatherAppIcons/droplet.svg'
    hazeIcon = WEATHER_ICONS+'/weatherAppIcons/haze.svg'
    mapIcon = WEATHER_ICONS+'/weatherAppIcons/map.svg'
    rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICONS+'/weatherAppIcons/snow.svg'
    stormIcon = WEATHER_ICONS+'/weatherAppIcons/storm.svg'
    thermometerIcon = WEATHER_ICONS+'/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg'

    @track weatherIcon = '';
    @track temperature = '';
    @track description = '';
    @track location = '';
    @track feelsLike = '';
    @track humidity = '';
    
    showWeatherDetails = false;


    cityName = '';
    searchHandler(event){
        this.cityName = event.target.value;
    }
    handleSubmit(event){
        event.preventDefault()
        this.fetchData()
    }
    // fetchData() {
    //     console.log("cityName", this.cityName);
    
    //     const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;
    
    //     fetch(URL)
    //         .then(res => res.json())                                        // we can do this way also
    //         .then(result => {
    //             console.log(JSON.stringify(result));
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.error = "An error occurred.";
    //         });
    // }
    

    async fetchData() {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;
    
        try {
            const response = await fetch(URL);
          
            const weatherData = await response.json();
    
            // Determine weather icon based on weather condition id
            const weatherId = weatherData.weather[0].id;
    
            if (weatherId === 800) {
                this.weatherIcon = this.clearIcon;
            } else if ((weatherId >= 200 && weatherId <= 232) || (weatherId >= 600 && weatherId <= 622)) {
                this.weatherIcon = this.stormIcon;
            } else if (weatherId >= 701 && weatherId <= 781) {
                this.weatherIcon = this.hazeIcon;
            } else if (weatherId >= 801 && weatherId <= 804) {
                this.weatherIcon = this.cloudIcon;
            } else if ((weatherId >= 500 && weatherId <= 531) || (weatherId >= 300 && weatherId <= 321)) {
                this.weatherIcon = this.rainIcon;
            } else {
                // Handle other cases if needed
                this.weatherIcon = ''; // For cases where no specific icon is available
            }
    
            // Update other properties with fetched data
            this.temperature = Math.floor(weatherData.main.temp); // Round down to nearest integer
            this.description = weatherData.weather[0].description;
            this.location = weatherData.name + ', ' + weatherData.sys.country; // Adding country to city name
            this.feelsLike = Math.floor(weatherData.main.feels_like); // Round down to nearest integer
            this.humidity = weatherData.main.humidity;

            this.showWeatherDetails = true;
    
        } catch (error) {
            console.log(error);
            this.error = "City not found"; // Display error message
            this.showWeatherDetails = false; // Hide the weather details section
        }
    }
    clearWeatherData() {
        this.weatherIcon = '';
        this.temperature = '';
        this.description = '';
        this.location = '';
        this.feelsLike = '';
        this.humidity = '';
        this.showWeatherDetails = false;
    }
    }
