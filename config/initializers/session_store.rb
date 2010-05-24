# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_socky_example_session',
  :secret      => 'f82093f6e2db8299e5fa0528e5b0a5789946ed6bfee558601eff208e2000936a49d5e5ac001a9837a0234e2fff2501a2f38e7577f459670f1ed77d5287c9d088'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
