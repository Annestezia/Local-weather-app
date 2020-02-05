(()=>{
  let lat,lon, queryLink;
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
  const darkskyEndpoint = 'https://api.darksky.net/forecast/';
  const key ="b1af518e5e126c8ce8367a1f38dc60fc";

  // getting lon lat
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success);
  }
  //success callback for getCurrentPosition
  function success(position){      
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    queryLink=`${corsAnywhere}${darkskyEndpoint}${key}/${lat},${lon}`;
    //get weather data
    $.getJSON(queryLink,json=>{
      showForecast(json);
    });
  };
  // Get class to display icon
  const getIconClass=(icon)=>{
    switch(icon){
      case 'clear-day':{ return 'wi wi-day-sunny'; break;}
      case 'clear-night':{ return 'wi wi-night-clear'; break;}
      case 'rain':{ return 'wi wi-rain'; break;}
      case 'snow':{ return 'wi wi-snow'; break;}
      case 'sleet':{ return 'wi wi-sleet'; break;}
      case 'cloudy':{ return 'wi wi-cloudy'; break;}
      case 'wind':{ return 'wi wi-windy'; break;}
      case 'fog':{return 'wi wi-fog'; break;}
      case 'partly-cloudy-day':{ return 'wi wi-day-cloudy'; break;}
      case 'partly-cloudy-night':{ return 'wi wi-night-partly-cloudy'; break;}
      default:{return 'wi wi-na'; break;}
    } 
  };
  //display data in app
  const showForecast=(json)=>{
    const {timezone}=json;
    const {summary,icon,temperature}=json.currently;
    const tempF = Math.floor(temperature);
    const tempC = Math.floor((tempF-32)*5/9);
    const iconClass=getIconClass(icon);
    $('#location').text(timezone);
    $('#weatherIcon').addClass(iconClass);
    $('#weatherCondition').text(summary);
    $('#temperature').text(`${tempC} \u2103`);     
    convertFC(tempF, tempC);
   };
  const convertFC=(tempF, tempC) =>{
    $('#fahrenheit').on('click', function () {
      $('#fahrenheit').parent().addClass('active');
      $('#celsius').parent().removeClass('active');
      $('#temperature').text(`${tempF} \u2109`);
    });
    $('#celsius').on('click', function () {
      $('#celsius').parent().addClass('active');
      $('#fahrenheit').parent().removeClass('active');
      $('#temperature').html(`${tempC} \u2103`);
    });
  }   
})();
