var pwd = "";
function cargarMenu() {
  if ($("#profileDiv").is(":visible")) {
    $("#profileDiv").addClass("d-none");
  } else {
    $("#profileDiv").removeClass("d-none");
  }
  $("#dExit").on("click", () => {
    logout();
  });
  $("#dEntradas").on("click", (event) => {
    event.preventDefault();
    $(".login-box").removeClass("d-none");
    $("#sEntradas").removeClass("d-none");
    $("#profileDiv").addClass("d-none");
  });
  $("#dUser").on("click", (event) => {
    event.preventDefault();
    $(".login-box").removeClass("d-none");
    $("#sPerfil").removeClass("d-none");
    $("#profileDiv").addClass("d-none");
    //OBTENER DATOS
    getUsuario(usuario).then((el) => {
      console.log(el);
      $("#mostrarTextUsuario").val(el.usuario);
      pwd = el.contrasena;
      $("#mostrarTextNombre").val(el.nombre);
      $("#mostrarTextApellido").val(el.apellido);
      $("#mostrarTextEmail").val(el.email);
      $("#mostrarTextFnac").val(el.fnac);
      console.log("CAMBIADOS");
    });
    //var datos = getDatos(usuario);

    //

    $("#btnEliminar").on("click", () => {
      deletePreferencias(usuario);
    });

    $("#btnGuardar").on("click", () => {
      var usu = $("#mostrarTextUsuario").val();
      var nombre = $("#mostrarTextNombre").val();
      var apellido = $("#mostrarTextApellido").val();
      var fnac = $("#mostrarTextFnac").val();
      var email = $("#mostrarTextEmail").val();

      //La contraseña no se podrá modificar asique no se visualizará

      guardarDatos(usu, pwd, nombre, apellido, fnac, email);
      $("#sPerfil").addClass("d-none");
    });
    $("#btnCancelar").on("click", () => {
      $("#sPerfil").addClass("d-none");
    });
  });
}

function carrito(){
  $("#iconCarrito").on("click", (event) => {
    event.preventDefault();
    $(".login-box").removeClass("d-none");
    $("#sCarrito").removeClass("d-none");
    $("#profileDiv").addClass("d-none");

    $("#btnComprar").on("click", () => {
      alert("Y ahora mi dragoncito pandora");
    });

    $("#btnCerrar").on("click", () => {
      $("#sCarrito").addClass("d-none");
    });
    $("#btnVaciar").on("click", () => {
      alert("Dragoncito dragoncito!!No me seas rancio");
    });
  });
}