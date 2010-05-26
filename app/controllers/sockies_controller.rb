class SockiesController < ApplicationController

  skip_before_filter :verify_authenticity_token

  def subscribe
    render :socky do |page|
      page.insert_html :top, 'messages', "<p>User #{h params[:client_id]} logged in</p>"
    end
    render :text => "ok"
  end

  def unsubscribe
    render :socky do |page|
      page.insert_html :top, 'messages', "<p>User #{h params[:client_id]} logged out</p>"
    end
    render :text => "ok"
  end

  def message
    client_ids = params[:client_ids].to_s.split(",").collect(&:strip)
    channels = params[:channels].to_s.split(",").collect(&:strip)
    if !client_ids.empty? && !channels.empty?
      type = :send_to_clients_on_channels
    elsif !client_ids.empty?
      type = :send_to_clients
    elsif !channels.empty?
      type = :send_to_channels
    else
      type = :send_to_all
    end
    render :socky => { :type => type, :client_ids => client_ids, :channels => channels } do |page|
      page.insert_html :top, 'messages', "<p><b>#{h params[:current_user]}:</b> #{h params[:message]}</p>"
    end
    render :update do |page|
      page << "$('message').clear();"
    end
  end

end
