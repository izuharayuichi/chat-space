$(function(){

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendName(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add${ user.id } chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoName(text){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ text }</p>
                </div>`
    search_list.append(html);
  }

  function registerName(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user.id }'>
                <input name='group[user_ids][]' type='hidden' value='${ user.id }'>
                <p class='chat-group-user__name'>${ user.name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    member_list.append(html);
  }

  $("#user-search-field").on('keyup', function(e){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: ('/users'),
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users){
      $("#user-search-result").empty();
      console.log(users.length)
      if (users.length !== 0 ) {
        users.forEach(function(user){
          appendName(user);
          $(`.user-search-add${ user.id }`).on('click', function(){
            registerName(user)
            $(this).parent().remove();
            $(`#chat-group-user-${ user.id }`).on('click', function(){
              $(this).parent().empty();
            })
          })
        })
      } else {
        appendNoName("一致する名前はありません");
      }
    })

    .fail(function() {
      alert('名前検索に失敗しました');
    })
  })
})
