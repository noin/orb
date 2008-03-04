class SessionsController < ApplicationController
  
  # Renders a login form
  def new; end
  
  # Handles OpenID Authentication
  def create
    if using_open_id?
      open_id_authentication(params[:openid_url])
    end
  end
  
  # Destroys the user's session
  def destroy
    redirect_to(root_url)
  end

protected
  def open_id_authentication(identity_url)
    authenticate_with_open_id(identity_url,
        :required => [ :nickname, :email ],
        :optional => :fullname) do |status, identity_url, registration|
      case status.code
      when :missing
        failed_login "Sorry, the OpenID server couldn't be found"
      when :canceled
        failed_login "OpenID verification was canceled"
      when :failed
        failed_login "Sorry, the OpenID verification failed"
      when :successful
        if @current_user = User.find_by_identity_url(identity_url)
          @current_user.assign_openid_sreg!(registration)

          if current_user.save
            successful_login
          else
            failed_login "Your OpenID profile registration failed: " +
              @current_user.errors.full_messages.to_sentence
          end
        else
          failed_login "Sorry, no user by that identity URL exists"
        end
      else
        failed_login status.message
      end
    end
  end

private
  def successful_login
    session[:user_id] = @current_user.id
    redirect_to(root_url)
  end

  def failed_login(message)
    flash[:error] = message
    redirect_to(new_session_url)
  end
end
