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
    CargarCompras();
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

function carrito() {
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

function CargarCompras() {
  var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };

  getCompras(usuario).then((resp) => {
    console.log(resp);
    resp.sort(compare);
    if (resp.length > 0) {
      previousId = "";
      resp.forEach((compra) => {
        console.log(compra.conciertoId);
        getConcierto(compra.conciertoId).then((concierto) => {
          getArtista(concierto.artistaId).then((artista) => {
            console.log(concierto);
            if (compra.compraId == previousId) {
              $(`#compra${compra.compraId}`).append(`
              <div class="p-3">
              ${compra.cantidad} entradas para ${artista.nombre}, compradas el ${capitalizeFirstLetter(
                new Date(compra.fecha).toLocaleDateString("es-ES", options)
              )} por ${compra.precio * compra.cantidad} €, cada una a ${compra.precio} €.                  
            </div>
            `);
            } else {
              $("#entradas").append(`
              <div id="compra${compra.compraId}">
                Identificador: ${compra.compraId}
                <div class="p-3">
                  ${compra.cantidad} entradas para ${artista.nombre}, compradas el ${capitalizeFirstLetter(
                new Date(compra.fecha).toLocaleDateString("es-ES", options)
              )} por ${compra.precio * compra.cantidad} €, cada una a ${compra.precio} €.                  
                </div>
              </div>
            `);
            }
            previousId = compra.compraId;
          });
        });
      });
    } else {
      $("#entradas").html(`<h3>No has realizado compras</h3>`);
    }
  });
}

function compare(a, b) {
  if (a.compraId < b.compraId) {
    return -1;
  }
  if (a.last_nom > b.last_nom) {
    return 1;
  }
  return 0;
}
