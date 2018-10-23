require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without content and image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it "is invalid without a user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end


# require 'rails_helper'
# describe Message do
#   describe '#create' do
#     it "is valid with a content" do
#       message = build(:content)
#       expect(message).to be_valid
#     end

#     it "is valid with a image" do
#       message = build(:image)
#       expect(message).to be_valid
#     end

#     it "is valid with a content and a image" do
#       message = build(:content, :image)
#       expect(message).to be_valid
#     end

#     it "is invalid without a content or a image" do
#       message = build(content: nil, image: nil)
#       message.valid?
#       expect(message.errors[:content][:image]).to include("can't be blank")
#     end

#     it "is invalid without a group_id" do
#       message = build(:user, group_id: nil)
#       message.valid?
#       expect(message.errors[:group_id]).to include("can't be blank")
#     end

#     it "is invalid without a user_id" do
#       message = build(:user, user_id: nil)
#       message.valid?
#       expect(message.errors[:user_id]).to include("can't be blank")
#     end
# end

