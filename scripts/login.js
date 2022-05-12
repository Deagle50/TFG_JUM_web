function cargarLogin() {
    // Se cierra el div login/registro y deja todo listo para futuro inicio como login
    if ($("#sLoginRegistro").is(":visible")) {
        $('#sLoginRegistro').addClass('d-none');
        $('#fRegistrarse').addClass('d-none');
        $("#aRegistrarse").removeClass('active').addClass('inactive');
        $("#aLogin").removeClass('inactive').addClass('active');  
    }
    else {
        $('#sLoginRegistro').removeClass('d-none');
        $('#fLogin').removeClass('d-none');
    }
    $("#aLogin").on("click", () =>  {
        if ($("#fRegistrarse").is(":visible")) {
            $('#fRegistrarse').addClass('d-none');
            $("#aRegistrarse").removeClass('active').addClass('inactive');
            $("#aLogin").removeClass('inactive').addClass('active');        
        }
        $('#fLogin').removeClass('d-none');
    });

    $("#aRegistrarse").on("click", () =>  {
        if ($("#fLogin").is(":visible")) {
            $('#fLogin').addClass('d-none');
            $("#aLogin").removeClass('active').addClass('inactive');
            $("#aRegistrarse").removeClass('inactive').addClass('active');
        }
        $('#fRegistrarse').removeClass('d-none');
    });

    $("#btnLogin").on("click", () => {
        var user = $("#textUser").val();
        var password = $("#textPassword").val();
        if (validar(user) && validar(password)){
            //login(user, password);
        }
        else {
            alert('Hay que rellenar todos los campos');
        }     
    });
    $("#btnRegistrarse").on("click", () => {
        var usu = $("#textUsuario").val();
        var contrasena = $("#textContrasena").val();
        var nombre = $("#textNombre").val();
        var apellido= $("#textApellido").val();
        var fnac= $("#textFnac").val();
        var email = $("#textEmail").val();
        guardarDatos(usu,contrasena,nombre,apellido, fnac,email);         
    });
}
function validar(campo) {
    if (campo == "") {
        return false;
    }
    return true;
}
function guardarDatos(usu,contrasena,nombre,apellido, fnac,email){
    if (validar(usu) && validar(contrasena) && validar(nombre) && validar(apellido) && validar(fnac) && validar(email)) {
        var usuario = {
           usuario: usu,
           contrasena: contrasena,
           nombre: nombre,
           apellido: apellido,
           fnac: fnac,
           email: email
       };
       // postRegistro(usuario);
   }
   else {
       alert('Hay que rellenar todos los campos');
   } 
}