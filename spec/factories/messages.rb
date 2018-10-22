FactoryGirl.define do

  factory :message do
    content   "hello!"
    image     "cat.jpg"
    group_id  "1"
    user_id   "1"
  end

end
