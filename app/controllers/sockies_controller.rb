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
    render :socky => { :type => :send_to_all } do |page|
      page.insert_html :top, 'messages', "<p><b>#{h params[:current_user]}:</b> #{h params[:message]}</p>"
    end
    render :update do |page|
      page << "$('message').clear();"
    end
  end

end
