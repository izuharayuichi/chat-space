class GroupsController < ApplicationController

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    Group.create(group_params)
      # redirect_to controller: :messages action: :index
  end

  def edit
  end

  def update
  end

  private
  def group_params
    params.permit(:name)
  end
end
