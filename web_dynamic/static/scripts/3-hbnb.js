$(document).ready(function(){
  let amenityDictionary = {};

  $.ajax({
     url: 'http://0.0.0.0:5001/api/v1/places_search/',
     type: 'post',
     contentType: 'application/json',
     data: JSON.stringify({}),
     success: function(data ){
	 for (let i = 0; i < data.length; i++) {
	     let article = $('<article>');
	     /*TITLE*/
	     let title = $('<div/>', {class: 'title'}).appendTo(article); /*create title*/
	     let h2title = $('<h2/>', {text:data[i]['name']}).appendTo(title); /*append to title*/
             $('<div/>', { class: 'price_by_night', text: data[i].price_by_night}).appendTo(title);

	     /*INFORMATION*/
	     let infoContainer = $('<div/>', {class: 'information'}).appendTo(article);
             let maxGuest = $('<div/>', {class: 'max_guest'}).appendTo(infoContainer);
	     let numberRoom = $('<div/>', {class: 'number_rooms'}).appendTo(infoContainer);
	     let numberBath = $('<div/>', {class: 'number_bathrooms'}).appendTo(infoContainer);

	     /*GUEST ICON*/
	     let guestIcon = $('<i/>', {class: 'fa fa-users fa-3x'}).appendTo(maxGuest);
	     $('<br/>').appendTo(maxGuest);
	     $('<div/>', {text: data[i]['max_guest'] + " Guests"}).appendTo(maxGuest);

	     /*NUMBER OF ROOMS*/
             let roomIcon = $('<i/>', {class: 'fa fa-bed fa-3x'}).appendTo(numberRoom);
             $('<br/>').appendTo(numberRoom);
             $('<div/>', {text: data[i]['number_rooms'] + " Bedrooms"}).appendTo(numberRoom);

             /*NUMBER OF BATHS*/
             let bathIcon = $('<i/>', {class: 'fa fa-bath fa-3x'}).appendTo(numberBath);
             $('<br/>').appendTo(numberBath);
             $('<div/>', {text: data[i]["number_bathrooms"] + " Bathroom"}).appendTo(numberBath);

             /*USER*/
             let user = $('<div/>', {class: 'user'});

	     /*Separate API call to populate user information*/
	     $.ajax({
                url: 'http://0.0.0.0:5001/api/v1/users/' + data[i]['user_id'],
		type: 'get',
		success: function(userData ){
		  $('<strong/>', {text : 'Owner: ' + userData['first_name'] + " " + userData['last_name']}).appendTo(user); 
		  user.appendTo(article);
             let description = $('<div/>', {class: 'description', text: data[i]['description']}).appendTo(user);
		}
	     });

	     $('.places').append(article);
         }
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
