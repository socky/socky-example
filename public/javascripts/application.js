// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

// Event.observe(window, 'load', function() {
//   Event.observe('message_form', 'submit', function(event) {
//     $('message_form').request({
//       method: 'post',
//       onSuccess: function(t) {
//         $('message').value = t.responseText;
//       }
//     });
//     Event.stop(event); // stop the form from submitting
//   });
// });
// 
// $.message_counter = 0;
// 
// Socky.prototype.respond_to_message = function(msg) {
//  data = JSON.parse(msg);
//  var count = $.message_counter++;
//  var message_id = 'message-' + count;
//  Insertion.Bottom('messages', '<li style="opacity:0;" id="' + message_id + '" class="' + data[0] + '"><span>' + data[1] + '</span>' + data[2] + '</li>');
//  new Effect.Opacity(message_id, { from: 0.0, to: 1.0, duration: 0.5 });
//  var messages = document.getElementById("messages");
//  messages.scrollTop = messages.scrollHeight;
// }

// NEW

function addMessage(type, header, content) {
  $("<li class='" + type + "'><span>" + header + "</span>" + content + "</li>").appendTo("#messages");
};

function runChat(username) {
  // Connect to Socky Server
  var socky = new Socky.Client('ws://localhost:3001/websocket/my_app');
  
  socky.bind("socky:connection:established", function() {
    addMessage("system", '', "Connected - joining channel...");
  });
  
  socky.bind("socky:connection:closed", function() {
    addMessage("system", '', "Connection closed");
  });

  // Subscribe to channel
  // You can subscribe to as much channels as you want
  // { write:true } option will allow sending messages directly to server
  //   note: this will require enabling this in authenticator
  // { data: { login: username } } all 'data' options are passed to other users
  channel = socky.subscribe("presence-chat-channel", { write: true, data: { login: username } });
  
  channel.bind("socky:subscribe:success", function(members) {
    addMessage("system", '', "Joined channel - " + members.length + " users online.");
  });
  
  channel.bind("socky:member:added", function(data) {
    addMessage("login", "", data.login + " joined chat");
  });
  
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
