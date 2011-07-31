SockyExample::Application.routes.draw do
  match "chat" => "mains#chat", :as => :chat
  match 'socky/auth' => 'sockies#auth'
  
  root :to => "mains#login"
end
