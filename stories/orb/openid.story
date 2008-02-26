Story: OpenID user authenticates
  As an OpenID user
  I want to be able to log in
  So that only I can edit my information on the site

  Scenario: member logs in with valid OpenID and sees welcome page
	Given a member with valid OpenID: user.openid.provider
	When member logs in with OpenID: user.openid.provider
	Then member should see the welcome page

  Scenario: member logs in with invalid OpenID
	Given a member with invalid OpenID: user.openid.provider
	When member logs in with OpenID: user.openid.provider
	Then member should see an error page

  Scenario: user logs in with unregistered OpenID
	Given a user with valid OpenID: user.openid.provider
	When user logs in with OpenID: user.openid.provider
	Then member should see registration page