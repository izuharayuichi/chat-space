module ControllerMacros
  def login_user(user)
    @request.env["devise.mappimg"] = Devise.mappings[:user]
    sign_in user
  end
end
