class SockiesController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def subscribe
    send_to_clients ["login", "", "User #{params[:client_id]} logged in"]
    render :text => "ok"
  end

  def unsubscribe
    send_to_clients ["logout", "", "User #{params[:client_id]} logged out"]
    render :text => "ok"
  end

  def message
    send_to_clients ["message", "#{params[:current_user]}: ", params[:message]]
    render :nothing => true
  end

  private

  def send_to_clients(data)
    Socky.send(data.collect{|d| CGI.escapeHTML(d)}.to_json)
  end

end
