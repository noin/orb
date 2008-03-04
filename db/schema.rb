ActiveRecord::Schema.define(:version => 2) do

  create_table "open_id_authentication_associations", :force => true do |t|
    t.integer "issued"
    t.integer "lifetime"
    t.string  "handle"
    t.string  "assoc_type"
    t.binary  "server_url"
    t.binary  "secret"
  end

  create_table "open_id_authentication_nonces", :force => true do |t|
    t.integer "timestamp",  :null => false
    t.string  "server_url"
    t.string  "salt",       :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "identity_url"
    t.string   "login"
    t.string   "email"
    t.string   "fullname"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
