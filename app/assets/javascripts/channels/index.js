$(function(){
  $('.chat-group-form__field--right').on('keyup', function(e){
    e.preventDefault();
    var formData = new FormData(this);
  })
})
