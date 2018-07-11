$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main__body--messages-list">
                  <div class="chat-main__body--message">
                    <div class="chat-main__body--message-name">
                      ${ message.user.name }
                    </div>
                    <div class="chat-main__body--message-time">
                      ${ message.created_at.strftime("%Y/%m/%d %H:%M") }
                    </div>
                    <div class="chat-main__body--message-body">
                      ${ message.body if message.body.present? }
                      ${ image_tag message.image.url,class: 'message__image'if message.image.present? }
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
      $('.message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
