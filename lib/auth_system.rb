module AuthSystem
  protected
    def logged_in?
      @current_user != :false
    end

    def current_user
      @current_user ||= (login_from_session || :false)
    end

    def current_user=(new_user)
      session[:user_id] = (new_user.nil? || new_user.is_a?(Symbol)) ? nil : new_user.id
      cookies[:user_url] = { :value => url_to_string(new_user.identity_url), :expires => 2.years.from_now }
      @current_user = new_user || :false
    end
    
    def url_to_string(url)
      url.gsub!(/http(s|):\/\//, '')
      url[0..(url.length - 2)] if url[(url.length-1)..(url.length-1)] == '/' # remove trailing slash
    end

    def login_required
      logged_in? || access_denied
    end

    def access_denied
      respond_to do |format|
        format.html do
          store_location
          redirect_to new_user_path
        end
        format.any do
          # um.. dunno yet
        end
      end
    end

    def store_location
      session[:return_to] = request.request_uri
    end

    def redirect_back_or_default(default)
      redirect_to(session[:return_to] || default)
      session[:return_to] = nil
    end

    def self.included(base)
      base.send :helper_method, :current_user, :logged_in?
    end

    def login_from_session
      self.current_user = User.find_by_id(session[:user_id]) if session[:user_id]
    end
end
