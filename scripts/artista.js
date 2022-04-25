console.log("PRELOAD");

$(document).load(() => {
  console.log("LOAD");
});

function cargarArtista() {
  artistaSeleccionado = localStorage.getItem("artistaSeleccionado");
  console.log("ID: " + artistaSeleccionado);
  settings.url = url + "artistas/" + artistaSeleccionado;
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#divImgArtista").append(`<img id="img${artistaSeleccionado}" src="${url}images/${artistaSeleccionado}.jpg"/>`);
  });
  $("#fade").css("height", $($("#divImgArtista").children(0)).height());
}
