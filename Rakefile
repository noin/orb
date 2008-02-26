# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require(File.join(File.dirname(__FILE__), 'config', 'boot'))

require 'rake'
require 'rake/testtask'
require 'rake/rdoctask'

require 'tasks/rails'

desc "Run all stories"
task :stories do
#  html = 'story_server/prototype/rspec_stories.html'
  ruby "stories/all.rb"#" --colour --format plain --format html:#{html}"
#  unless IO.read(html) =~ /<span class="param">/m
#    raise 'highlighted parameters are broken in story HTML'
#  end
end