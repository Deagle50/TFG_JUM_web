var pwd = "";
function cargarMenu() {
  // Control de visualizar perfil
  if ($("#profileDiv").is(":visible")) {
    $("#profileDiv").addClass("d-none");
  } else {
    $("#profileDiv").removeClass("d-none");
  }
  // Cerrar sesión
  $("#dExit").on("click", () => {
    logout();
  });
  // Apartado entradas del usuario
  $("#dEntradas").on("click", (event) => {
    event.preventDefault();
    mostrarMenu("#sEntradas");
    CargarCompras();
  });
  // Datos usuario
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
    // Boton eliminar preferencias
    $("#btnEliminar").on("click", () => {
      deletePreferencias(usuario).then(() => {
        cargarPreferencias();
      });
    });
    // Guardar datos tras la modificación
    $("#btnGuardar").on("click", () => {
      var usu = $("#mostrarTextUsuario").val();
      var nombre = $("#mostrarTextNombre").val();
      var apellido = $("#mostrarTextApellido").val();
      var fnac = $("#mostrarTextFnac").val();
      var email = $("#mostrarTextEmail").val();

      //La contraseña no se podrá modificar asique no se visualizará (se guarda al cargar los datos para pasarla)
      guardarDatos(usu, pwd, nombre, apellido, fnac, email);
    });
    // Se cierra la pantalla
    $("#btnCancelar").on("click", () => {
      OcultarMenu();
    });
  });
}

// Visualizar las entradas que tenemos en el carrito
function carrito() {
  $("#iconCarrito").on("click", (event) => {
    event.preventDefault();
    mostrarMenu("#sCarrito");
    CargarCarrito();

    // Comprar el contenido del carrito
    $("#btnComprar").on("click", () => {
      event.preventDefault();
      // HACER COMPRA
      if (JSON.parse(localStorage.getItem("carrito")) && JSON.parse(localStorage.getItem("carrito")).length() > 0) {
        MostrarToast("Compra realizada", "green");
        localStorage.removeItem("carrito");
        OcultarMenu();
      } else MostrarToast("El carrito está vacío", "red");
    });
    // Vaciar el carrito
    $("#btnVaciar").on("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("carrito");
      MostrarToast("El carrito se ha vaciado", "gray");
      OcultarMenu();
    });
  });
}
// Visualizamos lo que esta en el carrito (guardado en local Storage)
function CargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  $("#carrito-items").html("");
  if (carrito.length > 0)
    carrito.forEach((element) => {
      $("#carrito-items").append(`
      <div class="cartasCarrito" style="border solid grey 1px">
        <span>Referencia: ${element.conciertoId}</span>
        <span>Artista:  </span>
        <span>Municipio: ${element.municipio} </span>
        <span>Fecha: ${element.fecha} </span>
        <span>Precio/entrada: ${element.precio}€</span>
        <span>Cantidad entradas: ${element.cantidad}</span>
      </div>
      `);
    });
  else $("#carrito-items").html(`<h3 style="text-align: center">No hay ningún item en el carrito</h3>`);
}

// Visualizar las compras que ha realizado el usuario
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

// Visualizar menu
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
// Ocultar menu
function OcultarMenu() {
  $("#sEntradas").addClass("d-none");
  $("#sLoginRegistro").addClass("d-none");
  $("#sPerfil").addClass("d-none");
  $("#sCarrito").addClass("d-none");
  $("#blur").addClass("d-none");
  $(".login-box").addClass("d-none");
}
