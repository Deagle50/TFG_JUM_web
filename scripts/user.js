function cargarMenu() { 
    
    if ($("#profileDiv").is(":visible")) {
        $('#profileDiv').addClass('d-none');
    }
    else {
        $('#profileDiv').removeClass('d-none');
    }
    $("#dExit").on("click", () => {

        alert("bye" );
    });
    $("#dUser").on("click", () => {

        $("#sPerfil").removeClass('d-none');
        $('#profileDiv').addClass('d-none');

        //OBTENER DATOS
        $("#mostrarTextUsuario").val("Jenni");
        $("#mostrarTextContrasena").val("XXXX");
        $("#mostrarTextNombre").val("Jenni");
        $("#mostrarTextApellido").val("Holi");
        $("#mostrarTextEmail").val("jdos@gmail.com");
        $("#mostrarTextFnac").val('30/10/22');
          
        $("#btnGuardar").on("click", () => {
            var usu = $("#mostrarTextUsuario").val();
            var contrasena = $("#mostrarTextContrasena").val();
            var nombre = $("#mostrarTextNombre").val();
            var apellido= $("#mostrarTextApellido").val();
            var fnac= $("#mostrarTextFnac").val();
            var email = $("#mostrarTextEmail").val();
            guardarDatos(usu,contrasena,nombre,apellido, fnac,email);     
            $("#sPerfil").addClass('d-none');
            
        });
        $("#btnCancelar").on("click", () => {
            $("#sPerfil").addClass('d-none');
        });
    });

}