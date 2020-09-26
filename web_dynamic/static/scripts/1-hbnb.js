#!/usr/bin/node
/*
* Task 2
*/
const $ = window.$;
const jQuery = window.jQuery;
const d = {};
$(document).ready(function () {
  $("li [type='checkbox']").click(function () {
    if ($(this).is(':checked')) {
      $('.amenities h4').empty();
      d[$(this).attr('data-id')] = ($(this).attr('data-name'));
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
});
