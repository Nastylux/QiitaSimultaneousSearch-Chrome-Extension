$(document).ready(function () {


  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  var keyword = getQueryVariable('q');
  var rate_limit = 'https://qiita.com/api/v1/rate_limit';
  var endpoint = 'https://qiita.com/api/v1/search?q=' + keyword;
  var renderItemCount = 3;

  $.ajax({
    url: endpoint,
    type: 'GET',
    cache: true
  }).done(function (data) {

    var template = $('#mustache-template').html();
    for (var i = 0; i < renderItemCount; i++) {
      $('#qss__results').append(Mustache.render(template, {item: data[i]}));
    }
    if (data.length > 2) {
      $('#qss').fadeIn('200');
    }
  }).fail(function (data) {
    //do something
  }).always(function () {
    //do something
  }); //end ajax

  $.ajax({
    url: rate_limit,
    type: 'GET',
    cache: false
  }).done(function (data) {
    var template = $('#rateLimit-template').html();
    $('#qss__header__rateLimit').html(Mustache.render(template, data));
  }); //end ajax


});