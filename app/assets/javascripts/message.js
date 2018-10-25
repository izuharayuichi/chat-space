$(function(){
  function buildHTML(message){
    var html = `<div class="a-message">
                  <div class="name-and-date">
                    <p class="name-and-date__post-user">
                      ${message.user.name}
                    </p>
                    <p class="name-and-date__post-date">
                      ${format_posted_time(message.created_at)}
                    </p>
                    <% if message.content.present? %>
                      ${message.content}
                    <% end %>
                    <% if message.image.present? %>
                      ${message.image.url}
                    <% end %>
                  </div>
                </div>`
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
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.textbox').val('')
    })
  });
});
