json.name      @message.user.name
json.date      @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content   @message.content
json.image_url @message.image.url
json.user_id   @message.user.id
json.group_id  @message.group.id
