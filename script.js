function hidePreloader(){
  $(".preload").fadeOut(500);
}

$(document).ready(function () {
  function success(position) {
    const fccEndpoint = 'https://weather-proxy.freecodecamp.rocks';
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const queryLink = `${fccEndpoint}/api/current?lon=${lon}&lat=${lat}`;
    $.getJSON(queryLink, json => {
      hidePreloader();
      showForecast(json);
    });
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
});

  function showForecast(json) {
    console.log(json);
    const { name } = json;
    const { main, description, icon } = json.weather[0];
    const { temp } = json.main;
    const { country } = json.sys;  
    const tempC = Math.floor(temp);
    const tempF = Math.floor((tempC - 32) * 5 / 9);  
  
    $('#location').text(`${name}, ${country}`);
    $('#weatherIcon').attr({src: icon, alt:main,title:main});
    $('#weatherCondition').text(main);
    $('#temperature').text(`${tempC} \u2103`);
    switchFC(tempF, tempC);  
  }
  function switchFC(tempF, tempC) {
    $('#fahrenheit').on('click', function (e) {
      $(this).parent().addClass('active');
      $('#celsius').parent().removeClass('active');
      $('#temperature').text(`${tempF} \u2109`);
    });
    $('#celsius').on('click', function (e) {
      $(this).parent().addClass('active');
      $('#fahrenheit').parent().removeClass('active');
      $('#temperature').text(`${tempC} \u2103`);
    });
  }

  




