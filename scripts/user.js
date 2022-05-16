function cargarMenu() {
  if ($("#profileDiv").is(":visible")) {
    $("#profileDiv").addClass("d-none");
  } else {
    $("#profileDiv").removeClass("d-none");
  }
  $("#dExit").on("click", () => {
    logout();
  });
  $("#dUser").on("click", () => {
    $("#sPerfil").removeClass("d-none");
    $("#profileDiv").addClass("d-none");

    //OBTENER DATOS
    //var datos = getDatos(usuario);
    $("#mostrarTextUsuario").val("Jenni");
    $("#mostrarTextNombre").val("Jenni");
    $("#mostrarTextApellido").val("Holi");
    $("#mostrarTextEmail").val("jdos@gmail.com");
    $("#mostrarTextFnac").val("30/10/22");

    //var preferencias = getPreferencias(usuario);
    //$("#mostrarTextPreferencias").val(preferencias);

    $("#mostrarTextPreferencias").val("Happy flower from a lot of i think that i can see in the universe from the new galaxy of the world");

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
      var contrasena = "";


      guardarDatos(usu, contrasena, nombre, apellido, fnac, email);
      $("#sPerfil").addClass("d-none");
    });
    $("#btnCancelar").on("click", () => {
      $("#sPerfil").addClass("d-none");
    });
  });

  // $(".datepicker").datepicker({
  //   changeMonth: true,
  //   changeYear: true,
  // });
}
