class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
  #最新のメッセージについて、文章が投稿されている場合、画像が投稿されている場合、まだ投稿がされていない場合が考えられます。かといって、ビュー部分にif、while、caseなどを用いて条件分岐を書いてしまうと、ビューのコードが複雑になってしまい、読みづらくなってしまいます。このような場合には、モデルにインスタンスメソッドを定義することで、ビューの記述をシンプルにすることができます。
end
