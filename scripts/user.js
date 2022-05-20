var pwd = "";
function mostrarMenuDesplegable() {
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
    mostrarCompras();
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
        mostrarPreferencias();
      });
    });
    // Guardar datos tras la modificación
    $("#btnGuardar").on("click", () => {
      var usu = $("#mostrarTextUsuario").val();
      var nombre = $("#mostrarTextNombre").val();
      var apellido = $("#mostrarTextApellido").val();
      var fnac = $("#mostrarTextFnac").val();
      var email = $("#mostrarTextEmail").val();

      //La contraseña no se podrá modificar asique no se visualizará (se guarda al mostrar los datos para pasarla)
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
    MostrarCarrito();

    // Comprar el contenido del carrito
    $("#btnComprar").on("click", (event) => {
      event.preventDefault();
      // HACER COMPRA
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      if (carrito.length > 0) {
        let compraId = new Date().getFullYear().toString() + crearUID();
        let fecha = new Date().toISOString().slice(0, 19).replace("T", " ");
        carrito.forEach((element) => {
          let compra = {
            compraId: compraId,
            usuario: usuario,
            conciertoId: element.conciertoId,
            fecha: fecha,
            cantidad: element.cantidad,
            precio: element.precio,
          };
          postCompra(compra);
        });
        postCompra("asdasd", usuario);
        MostrarToast("Compra realizada", "green");
        localStorage.removeItem("carrito");
        OcultarMenu();
      } else MostrarToast("El carrito está vacío", "red");
    });
    // Vaciar el carrito
    $("#btnVaciar").on("click", (event) => {
      event.preventDefault();
      if (localStorage.getItem("carrito") && JSON.parse(localStorage.getItem("carrito")).length > 0) {
        localStorage.removeItem("carrito");
        MostrarToast("El carrito se ha vaciado", "gray");
      }
      OcultarMenu();
    });
  });
}
// Visualizamos lo que esta en el carrito (guardado en local Storage)
function MostrarCarrito() {
  var options = { year: "2-digit", month: "2-digit", day: "numeric" };
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  $("#carritoItems").html("");
  if (carrito.length > 0) {
    var totalPagar = 0;
    carrito.forEach((element) => {
      totalPagar = totalPagar + element.cantidad * element.precio;
      let fecha = new Date(element.fecha).toLocaleDateString("es-ES", options);
      // let fecha = new Date(element.fecha).getDate();
      $("#carritoItems").append(`
      <div class="cartaCarrito carritoItem" conciertoId="${element.conciertoId}" precio="${element.precio}">
        <ul>
          <li>Artista:  ${element.nombre} </li>
          <li>Municipio: ${element.municipio} </li>
          <li>Fecha: ${fecha} </li>
          <li>Precio/entrada: ${element.precio}€</li>
          <li>Cantidad entradas: ${element.cantidad}</li>
          <li>Precio final: ${(element.cantidad * element.precio).toFixed(2)}€</li>
        </ul>
      </div>
      `);
    });
    $(".carritoItem").on("click", (event) => {
      let id = $(event.currentTarget).attr("conciertoId");
      let precio = $(event.currentTarget).attr("precio");
      carrito.forEach((element, index) => {
        if (element.conciertoId == id && element.precio == precio) {
          $(event.currentTarget).remove();
          carrito.splice(index, 1);
          MostrarToast("Entradas eliminadas", "gray");
          totalPagar -= element.precio * element.cantidad;
          localStorage.setItem("carrito", JSON.stringify(carrito));
          $("#precio").text(totalPagar.toFixed(2));
        }
      });
    });

    $("#carritoItems").append(`
      <div class="cartaCarrito d-flex justify-content-between align-items-center">
        <span>Precio total:</span><span id="precio"> ${totalPagar.toFixed(2)}€</span>      
      </div>      
      `);
  } else $("#carritoItems").html(`<h3 style="text-align: center">No hay ningún item en el carrito</h3>`);
}

// Visualizar las compras que ha realizado el usuario
function mostrarCompras() {
  var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  $("#entradas").html("");

  getCompras(usuario).then((resp) => {
    if (resp.length > 0) {
      resp.sort(compare);
      previousId = "";
      resp.forEach((compra) => {
        let precioCompra = 0;
        getConcierto(compra.conciertoId).then((concierto) => {
          getArtista(concierto.artistaId).then((artista) => {
            getSala(concierto.salaId).then((sala) => {
              if ($("#entradas").find(`#compra${compra.compraId}`).length === 0) {
                $("#entradas").append(`
                  <div id="compra${compra.compraId}">
                    <div class="d-flex justify-content-between align-items-center mt-3">
                      <span>Identificador: ${compra.compraId}</span>
                      <div>
                      <span>Precio total:</span>
                      <span id="precio${compra.compraId}">0</span>
                      </div>
                    </div>
                  </div>
                `);
              }
              $(`#compra${compra.compraId}`).append(`
                <div class="cartaCarrito">
                  <ul>
                    <li>Artista:  ${artista.nombre} </li>
                    <li>Sala: ${sala.nombre} </li>
                    <li>Fecha: ${capitalizeFirstLetter(new Date(compra.fecha).toLocaleDateString("es-ES", options))} </li>
                    <li>Precio/entrada: ${compra.precio}€</li>
                    <li>Cantidad entradas: ${compra.cantidad}</li>
                    <li>Precio final: ${(compra.cantidad * compra.precio).toFixed(2)}€</li>
                  </ul>
                </div>
              `);
              precio = parseFloat($(`#precio${compra.compraId}`).text()) + compra.cantidad * compra.precio;
              $(`#precio${compra.compraId}`).text(precio.toFixed(2) + " €");
            });
          });
        });

        // console.log(`#precio${compra.compraId} ${precioCompra.toFixed(2)}`);
      });
    } else {
      $("#entradas").html(`<h3 style="text-align:center">No has realizado compras</h3>`);
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
  // Tenemos en cuenta que si esta sin loguearse, debe aparecer de primeras siempre el login
  $("#fRegistrarse").addClass("d-none");
  $("#aRegistrarse").removeClass("active").addClass("inactive");
  $("#aLogin").removeClass("inactive").addClass("active");

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

function crearUID() {
  var inicio = (Math.random() * 46656) | 0;
  var fin = (Math.random() * 46656) | 0;
  inicio = ("000" + inicio.toString(36)).slice(-3);
  fin = ("000" + fin.toString(36)).slice(-3);
  return (inicio + fin).toUpperCase();
}
