//Enter key event - search
addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById('button').click();
    }        
});

//Main function
function findWeather() {
        
    //Defining the APIs for both current weather and forecast
    let location1 = document.getElementById('Search').value;
    if (!location1 || location1 == "") {
        location1 = "Madrid";
    }
	let weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=';
        weatherAPI += location1;
        weatherAPI += '&appid=ece23eaa3a8d940b327a0cdc41c1e344&units=metric';
    
    let forecastAPI = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        forecastAPI += location1;
        forecastAPI += '&appid=ece23eaa3a8d940b327a0cdc41c1e344&units=Metric';
    


    fetch(weatherAPI).then(res => res.json()) // Fetching the weather API
		
    .then(data=> { console.log(data); 

        let weatherName = `${data.weather[0].main}`;
        document.getElementById('status').innerHTML = `<p>` +weatherName+ `</p>`;


        function displayWeather(fileName, imgDestination, tempDestination, num) { //Function to display the image and temperature for the next days

            let forecastImg = `<img src="`+fileName+`" height="125px" alt="foto">`;
            document.getElementById(imgDestination).innerHTML = forecastImg;

            let forecastTemp = `<p>${Math.round(data.main.temp)} ºC </p>`;
            document.getElementById(tempDestination).innerHTML = forecastTemp;

        }

        switch (weatherName) { //Switch conditions to display the correct status and imges
            case "Thunderstorm":
                displayWeather('../img/thunderstorm.png', 'mainImg', 'temp');
                break;
            
            case "Drizzle":
                displayWeather('../img/mist.png', 'mainImg', 'temp');
                break;
            
            case "Rain":
                displayWeather('../img/rain.png', 'mainImg', 'temp');
                break;
            
            case "Snow":
                displayWeather('../img/snow.png', 'mainImg', 'temp');
                break;
                    
            case "Clear":
                let h = new Date();
                let Hour = h.getHours(); 
            
                if (Hour <= 20 || Hour >= 7) {
                    displayWeather('../img/sun.png', 'mainImg', 'temp');
                    break;
                }
                else {
                    displayWeather('../img/moon.png', 'mainImg', 'temp');
                    break;
                }
               
            case "Clouds":
                displayWeather('../img/cloud.png', 'mainImg', 'temp');
                break;
                
            default:
                displayWeather('../img/mist.png', 'mainImg', 'temp');
                break;    
        }         

        //Displaying the city name
        let cityName = `${data.name}`;
        document.getElementById('cityName').innerHTML = cityName;
        

        //Local time in each country
        let coords = `${data.coord.lat}` + ',' + `${data.coord.lon}`;

        let timeZoneAPI = 'https://dev.virtualearth.net/REST/v1/TimeZone/';
        timeZoneAPI += coords;
        timeZoneAPI += '?datetime=2018-05-15T13:14:15Z&key=AvJT50FT_wE8elSYVDq1Src1lwUbpnhIJGKoFUDy68xtuYegDgby4i8p_iW_5oyZ';
        fetch(timeZoneAPI).then(res => res.json())

        .then(timeData=> { console.log(timeData); 
        
            let UTCoffset = `${timeData.resourceSets[0].resources[0].timeZone.utcOffset}`;
        

            let d = new Date();
            let h = d.getUTCHours();
            let m = d.getMinutes();


            let localHour = (h + parseInt(UTCoffset))

            if (localHour < 10) {
                localHour = '0' + localHour;
            }                        
            if (m < 10) {
                m = '0' + m;
            }

            document.getElementById('hour').innerHTML = `<p>` +localHour+ ':' +m+ `<p>`;
        });


        //Max and min temperature for the day
        let max = `<p> Min temperature: ${Math.round(data.main.temp_max)} ºC </p>`;
        document.getElementById('max').innerHTML = max;

        let min = `<p> Min temperature: ${Math.round(data.main.temp_min)} ºC </p>`;
        document.getElementById('min').innerHTML = min;


        //Other weather conditions
        let humidity = `<p> Current humidity: ${data.main.humidity} % </p>`;
        document.getElementById('humidity').innerHTML = humidity;

        let windSpeed = `<p> Current wind speed: ${data.wind.speed} m/s </p>`;
        document.getElementById('windSpeed').innerHTML = windSpeed;
    });
    
    

	//Forecast         
    fetch(forecastAPI).then(res => res.json()) // Fetching the weather API
		
    .then(data=> { console.log(data);

        function displayForecast(fileName, imgDestination, tempDestination, num) { //Function to display the image and temperature for the next days

            let forecastImg = `<img src="`+fileName+`" height="80px" alt="foto">`;
            document.getElementById(imgDestination).innerHTML = forecastImg;

            let forecastTemp = `<p>${Math.round(data.list[num].main.temp)} ºC </p>`;
            document.getElementById(tempDestination).innerHTML = forecastTemp;

        }   

        function displayImage (imgDestination, tempDestination, num) {

            let weatherName = `${data.list[num].weather[0].main}`;

            switch (weatherName) { //Switch conditions to display the correct status and imges
                case "Thunderstorm":
                    displayForecast('../img/thunderstorm.png', imgDestination, tempDestination, num);
                    break;
        
                case "Drizzle":
                    displayForecast('../img/mist.png', imgDestination, tempDestination, num);
                    break;
        
                case "Rain":
                    displayForecast('../img/rain.png', imgDestination, tempDestination, num);
                    break;
        
                case "Snow":
                    displayForecast('../img/snow.png', imgDestination, tempDestination, num);
                    break;
                
                case "Clear":
                    let h = new Date();
                    let Hour = h.getHours(); 
        
                    if (Hour <= 20 || Hour >= 7) {
                        displayForecast('../img/sun.png', imgDestination, tempDestination, num);
                        break;
                    }
                    else {
                        displayForecast('../img/moon.png', imgDestination, tempDestination, num);
                        break;
                    }
            
                case "Clouds":
                    displayForecast('../img/cloud.png', imgDestination, tempDestination, num);
                    break;
            
                default:
                    displayForecast('../img/mist.png', imgDestination, tempDestination, num);
                    break;    
            }
        }
        
        displayImage("img1", "temp1", 0);

        displayImage("img2", "temp2", 1);

        displayImage("img3", "temp3", 2);

        displayImage("img4", "temp4", 3);


        //Weekday display
        let days = ['<p>Mon</p>', '<p>Tue</p>', '<p>Wen</p>', '<p>Thu</p>', '<p>Fri</p>', '<p>Sat</p>', '<p>Sun</p>', '<p>Mon</p>', '<p>Tue</p>', '<p>Wen</p>', '<p>Thu</p>'];
        let d = new Date();

        let d1 = d.getDay(); 
        document.getElementById('day1').innerHTML = days[d1];

        let d2 = d.getDay() + 1; 
        document.getElementById('day2').innerHTML = days[d2];
    
        let d3 = d.getDay() + 2; 
        document.getElementById('day3').innerHTML = days[d3];

        let d4 = d.getDay() + 3; 
        document.getElementById('day4').innerHTML = days[d4];

    });
}