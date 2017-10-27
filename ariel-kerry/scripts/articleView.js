'use strict';

// DONE: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// PUT YOUR RESPONSE HERE
const populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

const handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

const handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

const handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

const setTeasers = () => {
  console.log('setTeasers function called');
  $('.article-body *:nth-of-type(n+2)').hide();
  console.log('should hide nth-of-type(n+2)');
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    console.log('this is: ' + this);
    console.log('this parent is: ' + this.parent());
    if ($(this).text() === 'Read on &rarr;') {
      console.log('read on clicked');
      console.log('if statement this is: ' + this);
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      console.log('show less clicked');
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready(() => {
  populateFilters();
  handleCategoryFilter();
  handleAuthorFilter();
  handleMainNav();
  setTeasers();
})
