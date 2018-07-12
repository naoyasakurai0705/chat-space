$(function(){
  function buildHTML(message){
    var img = message.image ? `<img class="message__image" src= ${message.image} >` : "";
    var body = message.body ? message.body : "";
    var html = `<div class="chat-main__body--messages-list">
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
    var url = $(this).attr('action')
    $.ajax({
      url: url,
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
      // $('.message').val('')
      // $('.message__image').val('')
      $(".submit").prop("disabled", false)

   })
    .fail(function(){
      alert('error');
      $(".submit").prop("disabled", false)
    })
  })
});
