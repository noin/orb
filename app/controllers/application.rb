class ApplicationController < ActionController::Base
  include AuthSystem
  
  helper :all

  # See ActionController::RequestForgeryProtection for details
  protect_from_forgery
end
