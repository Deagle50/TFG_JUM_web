$(document).on("ready", () => {
  cargarMenuCompleto();

  if (usuario)
    getToken(usuario).then((resp) => {
      token = resp.token;
      despuesDeLogin();
    });

  obtenerArtistas();

  $("#iconLogin").on("click", () => {
    if (logueado) 
    cargarMenu();
    else 
    cargarLogin();
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

async function obtenerArtistas() {
  todosArtistas = await getArtistas();
  if (!window.location.href.includes("artista")) cargarCarouselYGaleria(todosArtistas);
}
