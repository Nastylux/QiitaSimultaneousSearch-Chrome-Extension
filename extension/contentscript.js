$(document).ready(function () {

  function qss() {
    $('#qssResults').remove();

    var keyword = $('#gbqfq').val();
    var encodedKeyword = encodeURI(keyword);

    var jqIframe = $('<iframe/>')
      .attr('src', chrome.extension.getURL('widget.html') + '?q=' + encodedKeyword)
      .attr('id', 'qssResults')
      .addClass('col')
      .css({
        'width': '480px',
        'height': '263px',
        'border': 'none',
        'display': 'block'
      });

    $('#rhs').append(jqIframe);

  }

  $('#gbqfb').on('click', function () {
    qss();
  });

  $("#gbqfq").keydown(function (event) {
    if (event.keyCode == 13) {
      setTimeout(function(){
        qss();
      },3000);
    }
  });

  qss();

});