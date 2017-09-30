$(document).ready(function(){
  let amenityDictionary = {};
  $.ajax({
     url: 'http://0.0.0.0:5001/api/v1/places_search/',
     type: 'post',
     contentType: 'application/json',
     data: JSON.stringify({}),
     success: function(data ){
     },
     error: function( jqXhr, textStatus, errorThrown ){
       console.log( errorThrown );
     }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status == "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });
  $("input").change(function(){
    let result = "";
    let i = 0;
    if(this.checked){
      amenityDictionary[$(this).attr("data-id")] = $(this).attr("data-name");
      for (let key in amenityDictionary) {
        if (i !== 0) {
          result += ", " + amenityDictionary[key];
        } else {
          result += amenityDictionary[key];
        }
        i += 1;
      }
      $(".amenities h4").text(result);

    }else {
      let result = "";
      let i = 0;
      delete (amenityDictionary[$(this).attr("data-id")]);
      for (let key in amenityDictionary) {
          if (i !== 0) {
            result += ", " + amenityDictionary[key];
          } else {
             result += amenityDictionary[key];
	  }
        i += 1;
      }
      $(".amenities h4").text(result);
    }
  });
});
