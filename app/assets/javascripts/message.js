$(function(){
  function buildHTML(message){
    var img = message.image ? `<img class="message__image" src= ${message.image} >` : "";
    var body = message.body ? message.body : "";
    var html =
                `<div class="chat-main__body--messages-list" data-message-id="${message.id}">
                  <div class="chat-main__body--message">
                    <div class="chat-main__body--message-name">
                      ${ message.user_name }
                    </div>
                    <div class="chat-main__body--message-time">
                      ${ message.created_at}
                    </div>
                    <div class="chat-main__body--message-body">
                      ${ body }
                      ${ img }
                    </div>
                  </div>
                </div>`
    return html;
  }

  function scrollDown(){
    $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: location.href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      scrollDown()
      $('#new_message')[0].reset()
      $(".submit").prop("disabled", false)
     })
    .fail(function(){
      alert('error');
      $(".submit").prop("disabled", false)
    })
  });

  var interval = setInterval(function() {
      if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
      var id = $('.chat-main__body--messages-list').last().data("message-id");
    $.ajax({
      url: location.pathname,
      type: "GET",
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(json) {
      var insertHTML ='';
      json.messages.forEach(function(message) {
        if (message.id > id ) {
          insertHTML = buildHTML(message)
          scrollDown()
        }
      });
      $('.chat-main__body').append(insertHTML);
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }} , 5000 );
});
