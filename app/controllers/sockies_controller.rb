require 'socky/authenticator'

class SockiesController < ApplicationController

  def auth
    result = Socky::Authenticator.authenticate(params, :allow_changing_rights => true, :secret => 'my_secret')
    render :json => result
  end

end
