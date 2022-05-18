$(document).on("ready", () => {
  // Llamada a la funcion para cargar los menus ocultos de interaccion
  cargarMenuCompleto();

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
    if (logueado) cargarMenu();
    else cargarLogin();
  });

  // https://code.tutsplus.com/es/tutorials/easy-form-validation-with-jquery--cms-33096
  // $("#fRegistrarse").validate({
  //   rules: {
  //     textNombre : {
  //       required: true,
  //       minlength: 3
  //     },
  //     textApellido: {
  //       required: true,
  //       minlength: 3
  //     },
  //     textUsuario: {
  //       required: true,
  //       minlength: 3
  //     },
  //     textEmail: {
  //       required: true,
  //       email: true
  //     }
  //   },
  //   messages : {
  //     textNombre: {
  //       minlength: "Name should be at least 3 characters"
  //     },
  //     textApellido: {
  //       minlength: "Name should be at least 3 characters"
  //     },
  //     textUsuario: {
  //       minlength: "Name should be at least 3 characters"
  //     },
  //     textEmail: {
  //       email: "The email should be in the format: abc@domain.tld"
  //     }
  //   }
  // });
});

// Carga de datos en funcion de la pantalla en la que se esta (principal todos los artistas, secundaria el artista elegido)
async function obtenerArtistas() {
  if (!window.location.href.includes("artista")) {
    todosArtistas = await getArtistas();
    cargarCarouselYGaleria(todosArtistas);
  } else {
    cargarArtista();
  }
}
