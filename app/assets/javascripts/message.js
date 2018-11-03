$(function(){

  function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class="a-message" data-message-id="${message.id}">
                  <div class="name-and-date">
                    <p class="name-and-date__post-user">
                      ${message.name}
                    </p>
                    <p class="name-and-date__post-date">
                      ${message.date}
                    </p>
                    <p class="name-and-date__text">
                      ${message.content}
                    </p>
                    ${insertImage}
                  </div>
                </div>`
    return html;
  }
  $('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
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
      // 必要な情報を書き加えて新しいメッセージ部分ができる
      var html = buildHTML(data);
      $('.messages').append(html)
      // 入力部分を空にする
      $('.input-box__text, .input-box__image').val('')
      var speed = 100; // ミリ秒で記述
      var href= $(this).attr("href");
      var target = $('.messages');
      var position = target.get(0).scrollHeight;
      $('.messages').animate({scrollTop:position}, speed, 'swing')
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
    })
    .fail(function(data){
      alert('自動更新に失敗しました')
    });
  } else {
    clearInterval(interval);
  }}, 5000);
});
