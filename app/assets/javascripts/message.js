$(function(){
  $('.js-form').on('submit', function(e){
    e.preventDefault();
    message = $('.js-form__text-field').val();
    console.log(message);
  });
});
