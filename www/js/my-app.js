document.addEventListener("deviceready", onDeviceReady, true);
var servidorurl="";// ruta del servidor (colocar la que se necesite)
function onDeviceReady() {
  $( "#salir" ).click(function() {
    navigator.app.exitApp();
  });
  $( "#vibrate" ).click(function() {
    navigator.vibrate(300);
  });
}
var myApp = new Framework7({
      material: true, //Activamos Material
    });
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
  // dynamicNavbar: true,
  // domCache: true //Activamos el DOM cache, para pages inline
});

var video;
myApp.onPageInit('grabar', function(page){
  video=null;

  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
  }
});

myApp.onPageInit('index', function(page){
  $( "#salir" ).click(function() {
    navigator.app.exitApp();
  });
  $( "#vibrate" ).click(function() {
    navigator.vibrate(300);
  });
});
myApp.onPageInit('camera', function(page){
  $( "#camera" ).click(function() {
    // start image capture
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  });
  $( "#borrar" ).click(function() {
    $('#superimagen').attr('src','images/dogo.jpg');
    $('#borrar').hide();
  });
  // capture callback
  var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      $('#superimagen').attr('src',path);
      $('#borrar').show();
          // do something interesting with the file
      }
    };

    // capture error callback
    var captureError = function(error) {
      navigator.notification.alert('Capture Error');
    };
});
myApp.onPageInit('weather', function(page){

  var onSuccess = function(position) {
    localLat = position.coords.latitude;
    localLon = position.coords.longitude;
    getData(localLat,localLon);
};

// onError Callback receives a PositionError object
//
function onError(error) {
  localLat = "35";
  localLon = "139";
  getData(localLat,localLon);
}
navigator.geolocation.getCurrentPosition(onSuccess, onError);
 function getData(lat,lon) {
  var fsAPI = "https://api.openweathermap.org/data/2.5/weather";
  $.getJSON( fsAPI, {
    APPID: "04eae6c6fffa42618241c12fcafd0ec0",
    lat: lat,
    lon: lon
  })
  .done(function( data ) {
    console.log( data );
    lat = data.coord.lat;
    lon = data.coord.lon;
    clima = data.weather[0].main;
    temp = data.main.temp - 273.15;
    pais = data.sys.country;
    ciudad = data.name;
    $('#pais').html(pais);
    $('#ciudad').html(ciudad);
    $('#temp').html(temp.toFixed(2)+"°C");
    $('#clima').html(clima);
    $('#lat').html(lat);
    $('#lon').html(lon);
    console.log(ciudad);
  });
 }

});

// myApp.onPageInit('*', function(page){
//
// // myApp.alert("Hola");
// myApp.closePanel('left');
//
// });
