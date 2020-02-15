var map, infoWindow;
function initMap() {
	geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      geocoder.geocode( { 'location': pos}, function(results, status, infowindow) {
      if (status == 'OK') {
            console.log(results[0].formatted_address);
            infoWindow.setContent('Location found: '+ results[0].formatted_address);
            infoWindow.setPosition(pos);
            infoWindow.open(map);
      } else {
      			console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
      map.setCenter(pos); },
  function() {
      handleLocationError(true, infoWindow, map.getCenter()); }); } 
  else {
    handleLocationError(false, infoWindow, map.getCenter()); }}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map); }