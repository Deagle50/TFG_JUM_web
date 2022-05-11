function cargarLogin() {

    $("#iconLogin").on("click", () =>  {
    // if() {
        if ($("#sLoginRegistro").is(":visible")) {
            $('#sLoginRegistro').addClass('d-none');
        }
        else {
            $('#sLoginRegistro').removeClass('d-none');
            $('#fLogin').removeClass('d-none');
        }
    // } 
    // else {
        if ($("#profileDiv").is(":visible")) {
            $('#profileDiv').addClass('d-none');
        }
        else {
            $('#profileDiv').removeClass('d-none');
        }
    // }
    });

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
        var fnac= $("#datepicker").val();
        var email = $("#textEmail").val();

        var fnac= $("#datepicker").val();
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
    });
}
function validar(campo) {
    if (campo == "") {
        return false;
    }
    return true;
}