// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

Event.observe(window, 'load', function() {
  Event.observe('message_form', 'submit', function(event) {
    $('message_form').request({
      method: 'post',
      onSuccess: function(t) {
        $('message').value = t.responseText;
      }
    });
    Event.stop(event); // stop the form from submitting
  });
});

$.message_counter = 0;

Socky.prototype.respond_to_message = function(msg) {
	data = JSON.parse(msg);
	var count = $.message_counter++;
	var message_id = 'message-' + count;
	Insertion.Bottom('messages', '<li style="opacity:0;" id="' + message_id + '" class="' + data[0] + '"><span>' + data[1] + '</span>' + data[2] + '</li>');
	new Effect.Opacity(message_id, { from: 0.0, to: 1.0, duration: 0.5 });
	var messages = document.getElementById("messages");
	messages.scrollTop = messages.scrollHeight;
}