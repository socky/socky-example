ActionController::Routing::Routes.draw do |map|
  map.root :controller => "mains", :action => "login"
  map.chat "/chat", :controller => "mains", :action => "chat"
  map.resource :socky, :collection => { :subscribe => :post, :unsubscribe => :post, :message => :post }
end
