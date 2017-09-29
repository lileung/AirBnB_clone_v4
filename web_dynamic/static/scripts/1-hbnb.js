$(document).ready(function(){
  let amenityDictionary = {};
  $("input").change(function(){
    if(this.checked){
      amenityDictionary[$(this).attr("data-id")] = $(this).attr("data-name");
    }else {
      delete (amenityDictionary[$(this).attr("data-id")]);
    }
  });
});
