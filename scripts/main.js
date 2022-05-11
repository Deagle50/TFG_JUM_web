
$(document).on("ready", () => {
  cargarLogin();
  settings.url = url + "artistas";
  $.ajax(settings).done(function (response) {
    todosArtistas = response;
    cargarCarouselYGaleria(response);
  
  });
  $(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
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