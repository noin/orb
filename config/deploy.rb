default_run_options[:pty] = true

set :application, "orb"
set :repository,  "git@github.com:noin/orb.git"
set :branch, "origin/master"
set :scm, :git
set :user, 'orb'
set :scm_passphrase, '8emb139'

set :deploy_via, :remote_cache
set :deploy_to, '/users/nflux/#{application}'

role :app, "nflux.net"
role :web, "nflux.net"
role :db,  "nflux.net", :primary => true