$(function(){

  var search_list = $(".chat-group-form__search");

  function appendName(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
      search_list.append(html);
  }

  function appendNoName(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                </div>`
    search_list.append(html);
  }

  $('.chat-group-form__field--right').on('keyup', function(e){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: ('/users'),
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users){
      $(".chat-group-user").remove();
      if (users.length !== 0 ) {
        users.forEach(function(user){
          appendName(user);
        });
      }
      else {
        appendNoName("一致する名前はありません");
      }
    })

    .fail(function() {
      alert('名前検索に失敗しました');
    })
  })
})
