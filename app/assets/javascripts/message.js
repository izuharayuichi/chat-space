$(function(){

  function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class="a-message" data-message-id="${ message.id }">
                  <div class="name-and-date">
                    <p class="name-and-date__post-user">
                      ${ message.name }
                    </p>
                    <p class="name-and-date__post-date">
                      ${ message.date }
                    </p>
                    <p class="name-and-date__text">
                      ${ message.content }
                    </p>
                    ${ insertImage }
                  </div>
                </div>`
    return html;
  }
  $('.js-form').on('submit', function(e){
    e.preventDefault();
    // if (".input-box__text" != null || ".input-box__image" !== null) {
    var formData = new FormData(this);
    // for(item of formData) console.log(item);
    // if ("formData.content" != "" || "formData.image.name" !== "") {
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        console.log(data.image_url)
        if ( data.content != null || data.image_url != null ) {
          // 必要な情報を書き加えて新しいメッセージ部分ができる
          var html = buildHTML(data);
          $('.messages').append(html)
          // 入力部分を空にする
          $('.input-box__text, .input-box__link').val('')
          var position = $('.messages').get(0).scrollHeight;
          $('.messages').animate({scrollTop:position}, 100, 'swing')
        }
      })
      .fail(function(){
        alert('error');
      })
      .always(function(){
        $(".input-box__btn").removeAttr("disabled");
      })
  });

    var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      url: (location.href),
      type: "GET",
      dataType: 'json'
    })
    .done(function(messages) {
      var latest_id = $('.a-message').last().attr('data-message-id')
      var insertHTML = '';
      messages.forEach(function(new_message) {
        if (new_message.id > latest_id){
          insertHTML += buildHTML(new_message);
        }
      });
      $('.messages').append(insertHTML);
      var position = $('.messages').get(0).scrollHeight;
      $('.messages').animate({scrollTop:position}, 100, 'swing')
    })
    .fail(function(data){
      alert('自動更新に失敗しました')
    });
  } else {
    clearInterval(interval);
  }}, 5000);
});
