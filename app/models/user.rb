class User < ActiveRecord::Base
  
  # Returns a User object from an identity url, and also updates the registration data.
  def self.with_openid(identity_url, registration)
    u = find_by_identity_url(identity_url) || User.new(:identity_url => identity_url)
    u.assign_openid_sreg(registration)
  end
  
  # Takes OpenID sReg data and correctly maps it to the appropriate keys in our local model.
  def assign_openid_sreg(registration)
    model_to_registration_mapping.each do |model_attribute, registration_attribute|
      unless registration[registration_attribute].blank?
        send("#{model_attribute}=", registration[registration_attribute])
      end
    end
  end
  
  # Same as #assign_openid_sreg, but performs a save after the 
  def assign_openid_sreg!(registration)
    assign_openid_sreg(registration)
    save
  end

private
  
  # Provides the mapping from OpenID sReg data to local data keys.
  def model_to_registration_mapping
    { 
      :login      => 'nickname', 
      :email      => 'email', 
      :fullname   => 'fullname' 
    }
  end
  
end