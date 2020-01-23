$(document).ready(function(){
  //get location
  const geoIP="https://api.ipdata.co/?api-key=test"
  // freeGeoIP="https://freegeoip.net/json/";
  $.getJSON(geoIP, function(ipData){
  let {latitude, longitude,location,city,country_code}=ipData;
    location= `${city}, ${country_code}`;
  const darkSkyAPI=`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b1af518e5e126c8ce8367a1f38dc60fc/${latitude},${longitude}`;
     //get forecast for  location    
   $.getJSON(darkSkyAPI, function(weatherData){
    const {summary,temperature,icon}=weatherData.currently;
    $('#location').html(location);
    $('#weatherCondition').html(summary);
     //get and switch celsius&farengheit
    var tempF = Math.floor(temperature);
    var tempC = Math.floor((tempF-32)*5/9);
    $('#temperature').html( tempC +' &deg;C') ;
    $('#fahrenheit').on('click', function(){
     $('#fahrenheit').parent().addClass('active');
     $('#celsius').parent().removeClass('active');
     $('#temperature').html( tempF +' &deg;F') ;
   });
  $('#celsius').on('click', function(){
     $('#celsius').parent().addClass('active');
     $('#fahrenheit').parent().removeClass('active');
     $('#temperature').html( tempC +' &deg;C') ;
   });
     //all about icons
     //Dark Sky says  thats all so far
        let  iconClass;
        switch(icon){
          case 'clear-day':{ iconClass = 'wi wi-day-sunny'; break;}
          case 'clear-night':{ iconClass = 'wi wi-night-clear'; break;}
          case 'rain':{ iconClass = 'wi wi-rain'; break;}
          case 'snow':{ iconClass = 'wi wi-snow'; break;}
          case 'sleet':{ iconClass = 'wi wi-sleet'; break;}
          case 'cloudy':{ iconClass = 'wi wi-cloudy'; break;}
          case 'wind':{ iconClass = 'wi wi-windy'; break;}
          case 'fog':{ iconClass = 'wi wi-fog'; break;}
          case 'partly-cloudy-day':{ iconClass = 'wi wi-day-cloudy'; break;}
          case 'partly-cloudy-night':{ iconClass = 'wi wi-night-partly-cloudy'; break;}
          default:{iconClass = 'wi wi-na'; break;}
                   }        
        $('#weatherIcon i').addClass(iconClass);     
    });    
  });
});