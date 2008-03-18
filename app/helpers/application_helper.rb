module ApplicationHelper
	require 'digest/sha1'
	require 'digest/md5'

	def microid(email, site = nil)
		site ||= request.protocol + request.host_with_port + request.path
		microid = Digest::SHA1.hexdigest(Digest::SHA1.hexdigest("mailto:#{email}") + Digest::SHA1.hexdigest(site))
		tag :meta, :name => "microid", :content => 'mailto+http:sha1:' + microid
	end

	# gravatar_url_for 'greenisus@gmail.com', :rating => 'R', :width => 80, :height => 80
	def gravatar_url_for(email, options = {})    
		url_for({ :gravatar_id => Digest::MD5.hexdigest(email), :host => 'www.gravatar.com',      
			:protocol => 'http://', :only_path => false, :controller => 'avatar.php'    
		}.merge(options))  
	end
end