function cargarLogin() {
    $("#iconLogin").click(function () {
        if ($(".login-box").is(":visible")) {
            $('.login-box').addClass('d-none');

        }
        else {
            $('.login-box').removeClass('d-none');
            $('#fLogin').removeClass('d-none');
        }
    });

    $("#btnLogin").click(function () {
        if ($("#fRegistrarse").is(":visible")) {
            $('#fRegistrarse').addClass('d-none');
            $("#btnRegistrarse").removeClass('active').addClass('inactive');
            $("#btnLogin").removeClass('inactive').addClass('active');        }
        $('#fLogin').removeClass('d-none');
    });

    $("#btnRegistrarse").click(function () {
        if ($("#fLogin").is(":visible")) {
            $('#fLogin').addClass('d-none');
            $("#btnLogin").removeClass('active').addClass('inactive');
            $("#btnRegistrarse").removeClass('inactive').addClass('active');
        }
        $('#fRegistrarse').removeClass('d-none');
    });
}