class SessionsController < ApplicationController
  
  # - GET /login
  # Renders a login form
  def new
    # Display views/sessions/new.rhtml.erb
  end
  
  # - POST /session
  # Handles OpenID Authentication
  def create
    # Redirect to destination or #new if the auth fails.
  end
  
  # - DELETE /session
  # - GET /logout
  # Destroys the user's session
  def destroy
    # Redirect to home_url
  end
  
end
