$(document).ready(function(darkSkyAPI,geoIP){
  //get location
  geoIP="https://api.ipdata.co/?api-key=test"
  // freeGeoIP="https://freegeoip.net/json/";
  $.getJSON(geoIP, function(obj){
  var lat, lon, location;
    lat= obj.latitude;
    lon=obj.longitude;
    location= obj.city+', '+obj.country_code;
  darkSkyAPI='https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b1af518e5e126c8ce8367a1f38dc60fc/' + lat + ',' + lon;
     //get forecast for  location    
   $.getJSON(darkSkyAPI, function(obj){
    $('#location').html(location);
    $('#weatherCondition').html(obj.currently.summary);
     //get and switch celsius&farengheit
    var tempF = Math.floor(obj.currently.temperature);
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
        var iconName = obj.currently.icon;
        var  iconClass;
        switch(iconName){
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