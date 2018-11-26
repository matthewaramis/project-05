(function($) {
  $(document).ready(function() {
    let lastPage = '';

    // get a random post and append content to the DOM
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();
      //ajax request
      getQuote();
    });

    function getQuote() {
      lastPage = document.URL;

      $.ajax({
        method: 'GET',
        url:
          qod_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          // Append content to the DOM e.g. replace quote content with REST API content

          // empty content
          $('.entry-content').empty();

          $('.entry-title').empty();

          $('.source').empty();

          // append content
          $('.entry-content').append(`${data[0].content.rendered}`);

          $('.entry-title').append(`&mdash; ${data[0].title.rendered}`);

          if (data[0]._qod_quote_source_url.length > 0) {
            $('.source').append(
              `, <a href="${data[0]._qod_quote_source_url}">
                ${data[0]._qod_quote_source}
              </a>`
            );
          } else if (data[0]._qod_quote_source.length > 0) {
            $('.source').append(`, ${data[0]._qod_quote_source}`);
          }

          const quote = data[0];

          console.log(data);

          // figure out the post slug
          history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);
        })
        .fail(function(err) {
          // Append a message for the user / alert a message saying something went wrong

          console.log(err);
        });
    } // end of getQuote

    $(window).on('popstate', function() {
      window.location.replace(lastPage);
    });

    // submit the form and create a new quote post

    $('#quote-submission-form').on('submit', function(event) {
      event.preventDefault();

      postQuote();
    });

    function postQuote() {
      // get values of your form inputs

      const quoteAuthor = $('#quote-author').val();

      const quoteContent = $('#quote-content').val();

      const quoteSource = $('#quote-source').val();

      const quoteSourceURL = $('#quote-source-url').val();

      $.ajax({
        method: 'POST',
        url: qod_vars.rest_url + 'wp/v2/posts',
        data: {
          title: quoteAuthor,
          content: quoteContent,
          _qod_quote_source: quoteSource,
          _qod_quote_source_url: quoteSourceURL,

          status: 'publish'
        },
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
        }
      })
        .done(function(response) {
          console.log(response);
          $('.quote-submission-wrapper').slideUp('fast');
          $('.quote-submission').append(
            '<p class="submission-msg">Your form has been submitted!</p>'
          );
          // slideUp the form
          //append a success message
        })
        .fail(function() {
          // output a message for user to say something went wrong
          $('.quote-submission').empty();
          $('.quote-submission').append(
            '<p class="submission-msg">Oops! Your form has failed to submit.</p>'
          );
        });
    }
  }); // end of doc ready
})(jQuery);
