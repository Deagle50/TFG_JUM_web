function cargarLogin() {
    $("#iconLogin").on("click", () =>  {
        if ($(".login-box").is(":visible")) {
            $('.login-box').addClass('d-none');
        }
        else {
            $('.login-box').removeClass('d-none');
            $('#fLogin').removeClass('d-none');
        }
    });

    $("#aLogin").on("click", () =>  {
        if ($("#fRegistrarse").is(":visible")) {
            $('#fRegistrarse').addClass('d-none');
            $("#aRegistrarse").removeClass('active').addClass('inactive');
            $("#aLogin").removeClass('inactive').addClass('active');        }
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
    });
    $("#btnRegistrarse").on("click", () => {
        var usu = $("#textUsuario").val();
        var contrasena = $("#textContrasena").val();
        var nombre = $("#textNombre").val();
        var apellido= $("#textApellido").val();
        var fnac= $("#datepicker").val();
        var email = $("#textEmail").val();
        // console.log(usu + " " + contrasena + " " + fnac);

        var usuario = {
            usuario: usu,
            contrasena: contrasena,
            nombre: nombre,
            apellido: apellido,
            fnac: fnac,
            email: email
        };
        // console.log(usuario);

       // postRegistro(usuario);
    });


}