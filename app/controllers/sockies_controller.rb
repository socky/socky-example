require 'socky/authenticator'

class SockiesController < ApplicationController

  def auth
    # Authenticate user. If, for any reason, this method return status other that 200 then user will not be connected.
    result = Socky::Authenticator.authenticate(params, :allow_changing_rights => true, :secret => 'my_secret')
    render :json => result
  end

end
