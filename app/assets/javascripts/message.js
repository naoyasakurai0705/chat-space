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
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast')
      $('#new_message')[0].reset()
      $(".submit").prop("disabled", false)
     })
    .fail(function(){
      alert('error');
      $(".submit").prop("disabled", false)
    })
  });


  var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href,
      type: "GET",
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(json) {
      var id = $('.chat-main__body--messages-list').last().data("message-id");
      var insertHTML ='';
      console.log(id)
      json.messages.forEach(function(message) {
        if (message.id > id ) {
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-main__body').append(insertHTML);
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }} , 3000 );
});
