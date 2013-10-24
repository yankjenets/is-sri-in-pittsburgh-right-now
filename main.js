$(document).ready(function() {
  updateText();
  updatePic();
});

function updateText() {
  var accessToken = "JGS4NPW5EQUA3OBTI0L5XU33H2UJBHL5XHDUTMRENV2APGHL";
  var sriUser = "https://api.foursquare.com/v2/users/61236?oauth_token=" + accessToken + "&v=20131023";
  $.get(sriUser, function(data, status) {
    var item = data.response.user.checkins.items[0]
    var date = item.createdAt;
    var currentTime = new Date();
    var minutesSinceCheckin = (currentTime.getTime() / 1000 - date) / 60;
    var currentLat = item.venue.location.lat;
    var currentLong = item.venue.location.lng;
    var kilometersFromPittsburgh = Math.round(calculateDistance(currentLong, currentLat) * 10) / 10;
    var resultString = "";
    if (item.venue.location.city != "Pittsburgh") {
      $("#answer").text("No.");
      resultString += "Sri is not in Pittsburgh.\nSri is " + kilometersFromPittsburgh + " kilometers away from Pittsburgh in the city " + item.venue.location.city;
    } else {
      $("#answer").text("Yes.");
      resultString += "Sri is in Pittsburgh!\nSri is";
    }
    resultString += " at " + item.venue.name;
    resultString += " (as recently as " + Math.round(minutesSinceCheckin) + " minutes ago at " + (new Date(date * 1000)).toLocaleTimeString() + ".)";
    $("#sri").text(resultString);
  });
}

//code from http://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(lon1, lat1) {
  // approximate coordinates of the UC
  var lon2 = -79.942092;
  var lat2 = 40.443078;
  var R = 6371; // km
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var lat1 = lat1 * Math.PI / 180;
  var lat2 = lat2 * Math.PI / 180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function updatePic() {
  var totalImages = 8
  var randImage = Math.floor(Math.random() * totalImages)

  img = new Image();
  var widthMultiplier = "";
  var heightMultiplier = "";
  img.src = "pictures/" + randImage + ".jpg";
  img.onload = function() {
    if (img.width > 1200) {
      widthMultiplier = "50%";
      heightMultiplier = "50%";
    }
    $("#sripic").attr({
      src: img.src,
      width: widthMultiplier,
      height: heightMultiplier
    });
  };
}