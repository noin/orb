module ApplicationHelper
  require 'digest/sha1'

  def microid(email, site = nil)
    site ||= request.protocol + request.host_with_port + request.path
    microid = Digest::SHA1.hexdigest(Digest::SHA1.hexdigest("mailto:#{email}") + Digest::SHA1.hexdigest(site))
    tag :meta, :name => "microid", :content => microid
  end  
end