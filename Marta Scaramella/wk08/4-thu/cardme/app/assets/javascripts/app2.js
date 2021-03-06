function cardsIndex(){
  var apiUrl = '/api/cards';
  var indexTemplate = Handlebars.compile($('#index-template').html());
  var cardTemplate = Handlebars.compile($('#card-template').html());

  $.ajax({ url: apiUrl }).done(renderIndex);

  function renderIndex(cards){

    var html = indexTemplate();
    $('#app').html(html);

    cards.forEach(function(card){
      var html = cardTemplate(card);
      $('.wrapper').append(html);
    })

    $('.wrapper').on('click', '.delete-action', deleteCard );
    // $('.wrapper').on('click', '.edit-action', editCard );
    // $('.new-card-form').on('submit', createCard);

    function deleteCard (event) {
      var id = $(this).closest('.card').data('id');
      $.ajax({
        url: '/api/cards/'+id,
        method: 'delete'
      }).done(function(){
        $(event.target).closest('.card').remove();
      });
    }

  }
}

$(document).ready(function(){
  cardsIndex();
});





// $(document).ready(function(){
//
//   $('.new-card-form').on('submit', function(event){
//     event.preventDefault();
//     $.ajax({
//       url: '/api/cards',
//       method: 'post',
//       data: {
//         name: $('.new-card-name').val(),
//         image_url: $('.new-card-image_url').val()
//       }
//     }).done(function(card){
//       var source = $('#card-template').html();
//       var template = Handlebars.compile( source );
//       var html = template( card );
//       $('.wrapper').append(html);
//     });
//   });
//
//   $.ajax({
//     url: '/api/cards'
//   }).done(function(res){
//     var shuffleCards = _.shuffle(res);
//     shuffleCards.forEach(function(card){
//       var source = $('#card-template').html();
//       var template = Handlebars.compile( source );
//       var html = template( card );
//       $('.wrapper').append(html);
//   });
//
//   $('.wrapper').on('click', '.delete-action', function(event){
//     var id = $(event.target).closest('.card').data('id');
//     $.ajax({
//       url: '/api/cards/' + id,
//       method: 'delete'
//     }).done(function(){
//       $(event.target).closest('.card').fadeOut(500, function(){$(this).remove()});
//     });
//   });
//
//   $('.wrapper').on('click', '.edit-action', function(event){
//     var id = $(event.target).closest('.card').data('id');
//     $('.wrapper').remove();
//     $('.new-card-form').remove();
//     var source = $('#edit-template').html();
//     var template = Handlebars.compile( source );
//     $('body').append(template);
//
//       $('.new-card-form').on('submit',function(){
//         $.ajax({
//           url: '/api/cards/'+ id,
//           method: 'put',
//           data: {
//             name: $('.edit-card-name').val(),
//             image_url: $('.edit-card-image_url').val()
//           }
//         }).done(function(card){
//           var source = $('#card-template').html();
//           var template = Handlebars.compile( source );
//           var html = template( card );
//           $('.wrapper').append(html);
//         });
//       });
//   });
//   });
// });
