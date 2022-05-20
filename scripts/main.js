$(document).on("ready", () => {
  // Llamada a la funcion para mostrar los menus ocultos de interaccion
  mostrarMenuCompleto();

  if (usuario)
    getToken(usuario)
      .then((resp) => {
        token = resp.token;
        despuesDeLogin();
        obtenerArtistas();
      })
      .catch(() => {
        obtenerArtistas();
      });
  else {
    obtenerArtistas();
  }
  // Muestra un menu al clickar en la opcion del menu en funcion de si hay usuario logueado o no
  $("#iconLogin").on("click", () => {
    if (logueado) mostrarMenuDesplegable();
    else mostrarLogin();
  });
});

// Carga de datos en funcion de la pantalla en la que se esta (principal todos los artistas, secundaria el artista elegido)
async function obtenerArtistas() {
  if (!window.location.href.includes("artista")) {
    todosArtistas = await getArtistas();
    mostrarCarouselYGaleria(todosArtistas);
  } else {
    mostrarArtista();
  }
}

function MostrarToast(string = "Holiwis desde el tostiwis", color = "#ad67d6") {
  $("body").append(`
    <div id="toast" class="d-flex justify-content-center">
      <div style="position:fixed; bottom:10%; margin:auto; background-color:${color}; border-radius:25px; padding:10px; z-index:10">${string}</div>
    </div>
  `);
  setTimeout(() => {
    $("#toast").remove();
  }, 2000);
}
