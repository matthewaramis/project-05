(function($) {
  $(document).ready(function() {
    // get a random post and append content to the DOM
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();
      //ajax request
      getQuote();
    });

    function getQuote() {
      $.ajax({
        method: 'GET',
        url:
          qod_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          // Append content to the DOM e.g. replace quote content with REST API content
          console.log(data);
        })
        .fail(function(err) {
          // Append a message for the user / alert a message saying something went wrong
          console.log(err);
        });
    }
  });
})(jQuery);
