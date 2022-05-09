$(document).on("ready", () => {
  settings.url = url + "artistas";
  $.ajax(settings).done(function (response) {
    todosArtistas = response;
    cargarCarouselYGaleria(response);
    cargarLogin();
  });
  $( function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  } );
});
