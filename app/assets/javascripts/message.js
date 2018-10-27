$(function(){
  function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class="a-message">
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
});
