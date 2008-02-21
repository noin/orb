require File.dirname(__FILE__) + "/../helper"

steps_for(:openid) do
  # Given the user's OpenID is valid
  Given("the user's OpenID is $valid") do |valid|
    if valid == "valid"
      pending "OpenID valid mock needed"
    elsif valid == "invalid"
      pending "OpenID invalid mock needed"
    end
  end
  
  Given("the user is a $type") do |type|
    if type == "new user"
      pending "New User mock needed"
    elsif type == "existing member"
      pending "Existing member mock needed"
    end
  end
  
  When("the user attempts to log in") do
    pending "OpenID login attempt mock needed"
  end
  
  Then("authentication should $result") do |result|
    if result == "succeed"
      pending "authentication pass result needed"
    elsif result == "fail"
      pending "authenticaiton fail result needed"
    end
  end

  Then("a membership should be created") do 
    pending "membership creation mock needed"
  end
  
end

with_steps_for(:openid) do
  run "openid_authentication.story"
end