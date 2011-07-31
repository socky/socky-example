// Add message to chat
function addMessage(type, header, content) {
  $("<li class='" + type + "'><span>" + header + "</span>" + content + "</li>").appendTo("#messages");
};

function runChat(username) {
  // Connect to Socky Server
  var socky = new Socky.Client('ws://localhost:3001/websocket/my_app');
  
  // Bind message after connecting to server
  socky.bind("socky:connection:established", function() {
    addMessage("system", '', "Connected - joining channel...");
  });
  
  // Bind message after disconnecting from server
  socky.bind("socky:connection:closed", function() {
    addMessage("system", '', "Connection closed");
  });

  // Subscribe to channel
  // You can subscribe to as much channels as you want
  // { write:true } option will allow sending messages directly to server
  //   note: this will require enabling this in authenticator
  // { data: { login: username } } all 'data' options are passed to other users
  channel = socky.subscribe("presence-chat-channel", { write: true, data: { login: username } });
  
  // Bind message after successfull joining channel
  channel.bind("socky:subscribe:success", function(members) {
    addMessage("system", '', "Joined channel - " + members.length + " users online.");
  });
  
  // Bind message after other user joins channel
  channel.bind("socky:member:added", function(data) {
    addMessage("login", "", data.login + " joined chat");
  });
  
  // Bind message after other user disconnect from channel
  channel.bind("socky:member:removed", function(data) {
    addMessage("logout", "", data.login + " left chat");
  });
  
  // Bind function to 'chat_message' event
  // This event can be sent by all clients with 'write' permission
  channel.bind("chat_message", function(message) {
    addMessage('', message.login + ': ', message.content);
  });
  
  // jQuery bind sending message via form to channel event
  $("#message_form").submit(function(e) {
    e.preventDefault();
    channel.trigger("chat_message", { content: $("#message").val(), login: username });
    $('#message').val('')
    return false;
  });
};
