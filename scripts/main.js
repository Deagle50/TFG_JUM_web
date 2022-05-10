$(document).on("ready", () => {
  cargarLogin();
  settings.url = url + "artistas";
  $.ajax(settings).done(function (response) {
    todosArtistas = response;
    cargarCarouselYGaleria(response);
  
  });
  $(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
});
