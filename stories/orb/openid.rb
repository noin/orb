require File.join(File.dirname(__FILE__) + '/../', *%w[helper])

run_story :type => RailsStory do |runner|
#  runner.steps << LoginSteps.new
  runner.load File.expand_path(__FILE__).gsub(".rb",".story")
end