const $ = window.$;
$(document).ready(function () {
  let amenityDictionary = {};
  $('input').change(function () {
    let result = '';
    let i = 0;
    if (this.checked) {
      amenityDictionary[$(this).attr('data-id')] = $(this).attr('data-name');
      for (let key in amenityDictionary) {
        if (i !== 0) {
          result += ', ' + amenityDictionary[key];
        } else {
          result += amenityDictionary[key];
        }
        i += 1;
      }
      $('.amenities h4').text(result);
    } else {
      let result = '';
      let i = 0;
      delete (amenityDictionary[$(this).attr('data-id')]);
      for (let key in amenityDictionary) {
        if (i !== 0) {
          result += ', ' + amenityDictionary[key];
        } else {
          result += amenityDictionary[key];
        }
        i += 1;
      }
      $('.amenities h4').text(result);
    }
  });
});
