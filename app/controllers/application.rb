class ApplicationController < ActionController::Base
  helper :all

  # See ActionController::RequestForgeryProtection for details
  protect_from_forgery
end
