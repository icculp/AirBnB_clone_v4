#!/usr/bin/node
/*
* Task 3
*/
const $ = window.$;
const jQuery = window.jQuery;
const d = {};
const keys = {};
$(document).ready(function () {
  const ur = 'http://0.0.0.0:5001/api/v1/status/';
  $.getJSON(ur, function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $("li [type='checkbox']").click(function () {
    if ($(this).is(':checked')) {
      $('.amenities h4').empty();
      d[$(this).attr('data-id')] = ($(this).attr('data-name'));
      $('keys.amenities').append($(this).attr('data-id'));
      $('.amenities h4').append(Object.values(d).join(', '));
    } else {
      delete d[$(this).attr('data-id')];
      $('.amenities h4').empty();
      if (jQuery.isEmptyObject(d)) {
        $('.amenities h4').empty();
        $('.amenities h4').append('&nbsp;');
      } else {
        $('.amenities h4').empty();
        $('.amenities h4').append(Object.values(d).join(', '));
      }
    }
  });


  $(':button').click(function () {
    // alert(Object.keys(d).length);
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: (Object.keys(d).length === 0) ? '{}' : {"amenities": Object.keys(d)},
      success: function (data) {
        $(data).each(function () {
          $('section.places').append('<article><div class="title_box"><h2>' + `${this.name}` + '</h2><div class="price_by_night">' + `${this.price_by_night}` + '</div></div><div class="information"><div class="max_guest">' + `${this.max_guest}` + '</div><div class="number_rooms">' + `${this.number_rooms}` + '</div><div class="number_bathrooms">' + `${this.number_bathrooms}` + '</div></div><div class="description">' + `${this.description}` + '</div></article>');
        });
      },
      contentType: 'application/json',
      dataType: 'json'
    });
  });

// would like to make this into it's own function outside of document ready
  // to avoid redundancy
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: (Object.keys(d).length === 0) ? '{}' : {"amenities": Object.keys(d)},
    success: function (data) {
      $(data).each(function () {
        $('section.places').append('<article><div class="title_box"><h2>' + `${this.name}` + '</h2><div class="price_by_night">' + `${this.price_by_night}` + '</div></div><div class="information"><div class="max_guest">' + `${this.max_guest}` + '</div><div class="number_rooms">' + `${this.number_rooms}` + '</div><div class="number_bathrooms">' + `${this.number_bathrooms}` + '</div></div><div class="description">' + `${this.description}` + '</div></article>');
      });
    },
    contentType: 'application/json',
    dataType: 'json'
  });
});
