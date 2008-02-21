Story: User uses OpenID to authenticate

	As a person with an OpenID
	I want to log in to the site
	So that I can be recognized as a member
	
Scenario: New user attempts authentication
	Given the user's OpenID is valid
	And the user is a new user

	When the user attempts to log in

	Then authentication should pass
	And a membership should be created

Scenario: Existing member attempts authentication
	Given the user's OpenID is valid
	And the user is a member
	
	When the user attempts to log in
	
	Then authentication should pass
	
Scenario: User attempts authentication
	Given the user's OpenID is invalid
	
	When the user attempts to log in
	
	Then authentication should fail
	And the user should get an error