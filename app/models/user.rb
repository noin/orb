class User < ActiveRecord::Base
  def assign_openid_sreg!(registration)
    model_to_registration_mapping.each do |model_attribute, registration_attribute|
      unless registration[registration_attribute].blank?
        send("#{model_attribute}=", registration[registration_attribute])
      end
    end
  end

private
  def model_to_registration_mapping
    { :login => 'nickname', :email => 'email', :fullname => 'fullname' }
  end
  
end