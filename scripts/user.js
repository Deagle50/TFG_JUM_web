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
    mostrarMenu("#sEntradas");
    CargarCompras();
  });
  $("#dUser").on("click", (event) => {
    event.preventDefault();
    mostrarMenu("#sPerfil");
    //OBTENER DATOS
    getUsuario(usuario).then((el) => {
      $("#mostrarTextUsuario").val(el.usuario);
      pwd = el.contrasena;
      $("#mostrarTextNombre").val(el.nombre);
      $("#mostrarTextApellido").val(el.apellido);
      $("#mostrarTextEmail").val(el.email);
      $("#mostrarTextFnac").val(el.fnac);
    });
    //var datos = getDatos(usuario);

    //

    $("#btnEliminar").on("click", () => {
      deletePreferencias(usuario).then(() => {
        cargarPreferencias();
      });
    });

    $("#btnGuardar").on("click", () => {
      var usu = $("#mostrarTextUsuario").val();
      var nombre = $("#mostrarTextNombre").val();
      var apellido = $("#mostrarTextApellido").val();
      var fnac = $("#mostrarTextFnac").val();
      var email = $("#mostrarTextEmail").val();

      //La contraseña no se podrá modificar asique no se visualizará

      guardarDatos(usu, pwd, nombre, apellido, fnac, email);
    });
    $("#btnCancelar").on("click", () => {
      OcultarMenu();
    });
  });
}

function carrito() {
  $("#iconCarrito").on("click", (event) => {
    event.preventDefault();
    mostrarMenu("#sCarrito");
    CargarCarrito();

    $("#btnComprar").on("click", () => {
      event.preventDefault();
      // HACER COMPRA
      if (JSON.parse(localStorage.getItem("carrito")) && JSON.parse(localStorage.getItem("carrito")).length() > 0) {
        MostrarToast("Compra realizada", "green");
        localStorage.removeItem("carrito");
        OcultarMenu();
      } else MostrarToast("El carrito está vacío", "red");
    });

    $("#btnCerrar").on("click", (event) => {
      event.preventDefault();
      OcultarMenu();
    });
    $("#btnVaciar").on("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("carrito");
      MostrarToast("El carrito se ha vaciado", "gray");
      OcultarMenu();
    });
  });
}

function CargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  $("#carrito-items").html("");
  if (carrito.length > 0)
    carrito.forEach((element) => {
      $("#carrito-items").append(`
      <div>
        <span>${element.conciertoId}</span>
        <span>${element.precio}</span>
        <span>${element.cantidad}</span>
      </div>
      `);
    });
  else $("#carrito-items").html(`<h3 style="text-align: center">No hay ningún item en el carrito</h3>`);
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

function mostrarMenu(menu) {
  if (!$(menu).hasClass("d-none")) {
    OcultarMenu();
    return;
  }
  $("#sEntradas").addClass("d-none");
  $("#sLoginRegistro").addClass("d-none");
  $("#sPerfil").addClass("d-none");
  $("#sCarrito").addClass("d-none");

  $("#blur").removeClass("d-none");
  $(".login-box").removeClass("d-none");
  $(menu).removeClass("d-none");
}

function OcultarMenu() {
  $("#sEntradas").addClass("d-none");
  $("#sLoginRegistro").addClass("d-none");
  $("#sPerfil").addClass("d-none");
  $("#sCarrito").addClass("d-none");
  $("#blur").addClass("d-none");
  $(".login-box").addClass("d-none");
}
