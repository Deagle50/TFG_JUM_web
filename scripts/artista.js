var artistaNombre = "";

async function mostrarArtista() {
  // Cogemos el artista del localStorage
  artistaSeleccionado = localStorage.getItem("artistaSeleccionado");
  settings.url = url + "artistas/" + artistaSeleccionado;

  // Obtenemos datos del artista
  getArtista(artistaSeleccionado).then((response) => {
    artistaNombre = response.nombre;
    document.title = response.nombre;
    // Cargamos imagen del grupo background
    $(".bg-image").css("background-image", `linear-gradient(transparent, #000 70%), url(${url}images/${artistaSeleccionado}.jpg)`);

    // Control de existencia de descripcion
    let descripcion = response.descripcion.replace("?", "") || "";
    let descMaxLength = 1000;
    if (descripcion.length > descMaxLength) {
      let desc2 = descripcion.slice(descMaxLength);
      descripcion = descripcion.slice(0, descMaxLength + desc2.indexOf(".") + 1);
    }

    // Añadimos nombre y descripcion del artista
    $("#artistaTitulo").append(
      `<div id="${response.id}" class="item">
        <h1>${response.nombre}</h1>
        <p>${descripcion}</p>
      </div>`
    );
    // Se carga el video del grupo
    mostrarVideoArtista(response.nombre);

    $("#artista").text("Próximos conciertos de " + response.nombre);

    // Si se esta logueado se cargan el icono corazon y se marcan segun lo guardado
    if (logueado)
      getPreferencias(usuario).then((preferencias) => {
        if (preferencias.length > 0) {
          preferencias.forEach((element) => {
            if (element.artistaId == artistaSeleccionado) {
              $(".fa-heart").removeClass("fa-regular");
              $(".fa-heart").addClass("fa-solid");
            }
          });
        }
      });

    // Control click icono corazon
    $(".fa-heart").on("click", (event) => {
      event.preventDefault();
      if (logueado)
        if ($(event.target).hasClass("fa-regular")) {
          // Añadir preferencia
          $(event.target).removeClass("fa-regular");
          $(event.target).addClass("fa-solid");

          postPreferencia(usuario, artistaSeleccionado);
        } else {
          // Quitar preferencia
          $(event.target).addClass("fa-regular");
          $(event.target).removeClass("fa-solid");
          deletePreferencia(usuario, artistaSeleccionado);
        }
      else MostrarToast("Tienes que loguearte para poder guardar favoritos");
    });
  });

  settings.url = url + "conciertosArtista/" + artistaSeleccionado;
  // Obtenemos conciertos del artista
  getConciertosArtista(artistaSeleccionado)
    .then((conciertos) => {
      const ms_minuto = 60000;

      let conciertos_ordenados = conciertos.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.fecha) - new Date(b.fecha);
      });
      // Mostramos la cantidad de conciertos que tiene el artista
      $("#count").text(conciertos_ordenados.length + " conciertos encontrados.");

      // Obtenemos datos concierto y la sala
      conciertos_ordenados.forEach((concierto) => {
        getSala(concierto.salaId).then((sala) => {
          // Se envian los datos del concierto y sala para mostrar en carta
          mostrarConciertos(concierto, sala);

          // Buscamos los teloneros de cada uno de los conciertos y se añaden sus datos bajo los del concierto (si tienen)
          getTelonerosConcierto(concierto.id).then((teloneros) => {
            if (teloneros.length > 0) {
              teloneros.forEach((telonero) => {
                getArtista(telonero.artistaId).then((artista) => {
                  fecha = new Date(new Date(concierto.fecha) - new Date(telonero.fecha) * ms_minuto).toLocaleTimeString("es-ES").slice(0, -3);
                  $(`#teloneros${concierto.id}`).append(`
                  <div id="telonero${artista.id}" class="teloneros" role="button"> 
                    <img src="${url}images/${artista.id}.jpg" alt="Telonero ${artista.nombre}">
                    <div class="d-flex justify-content-between w-100 px-4">
                      <span>${artista.nombre}</span>
                      <span>${fecha}</span>
                    </div>
                  </div>
                  `);
                  $(`#telonero${artista.id}`).attr("url", artista.id);
                  $(`#telonero${artista.id}`).on("click", (event) => {
                    localStorage.setItem("artistaSeleccionado", $(event.currentTarget).attr("url"));
                    window.location = "artista.html";
                  });
                });
              });
            }
          });
        });
      });

      // Cogemos la fecha del concierto para el contador cuenta atras
      let fecha = conciertos[0].fecha || null;
      document.getElementById("contador").innerHTML = fecha;
      countdown(fecha, "contador");
      setTimeout(() => {
        $(".fa-cart-plus").on("click", (event) => {
          event.preventDefault();
          AnadirACarrito(event);
        });
      }, 200);
      // Si no hay conciertos
    })
    .catch(() => {
      $("#conciertos").append(`<h3> No hay conciertos disponibles </h3>`);
    });
}

// Cartas contador de la cuenta atras conciertos (se divide la fecha por dias, horas, minutos...)
const getTime = (dateTo) => {
  let now = new Date(),
    time = (new Date(dateTo) - now + 1000) / 1000,
    seconds = ("0" + Math.floor(time % 60)).slice(-2),
    minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2),
    hours = ("0" + Math.floor((time / 3600) % 24)).slice(-2),
    days = Math.floor(time / (3600 * 24));

  return {
    seconds,
    minutes,
    hours,
    days,
    time,
  };
};

const countdown = (dateTo, element) => {
  if (!dateTo) {
    return;
  }
  const item = document.getElementById(element);
  // Se crea el intervalo para visualizar el contador
  const timerUpdate = setInterval(() => {
    let currenTime = getTime(dateTo);
    item.innerHTML = `
          <div class="row-cols-4 d-flex justify-content-center">
              <div class="col-lg-2 col-md-2 col-sm-4">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.days}
                      </div>
                      <div class="concept">
                          Días
                      </div>
                  </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-4">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.hours}
                      </div>
                      <div class="concept">
                          Horas
                      </div>
                  </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-4">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.minutes}
                      </div>
                      <div class="concept">
                          Minutos
                      </div>
                  </div>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-4">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.seconds}
                      </div>
                      <div class="concept">
                          Segundos
                      </div>
                  </div>
              </div>
          </div>`;

    if (currenTime.time <= 1) {
      clearInterval(timerUpdate);
    }
  }, 1000);
};

// Creamos y mostramos las cartas de los conciertos del artista con los datos
function mostrarConciertos(datosConcierto, datosUbicacion) {
  var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };

  $("#conciertos").append(
    `<div class="card col-lg-6 col-md-8 col-sm-12 col-xs-12">
      <div id="d${datosConcierto.id}"  class="event_container">
        <div class="event_info">
          <div class="event_title">
            <h4>${datosUbicacion.nombre}, ${datosUbicacion.municipio}</h4>
          </div>
          <div class="event_desc mt-2">
            <ul>
              <li>${datosUbicacion.direccion}<li>
              <li>
                <div class="formulario my-1">
                  <div class="precio">
                    <label for="desde-${datosConcierto.id}">Desde ${datosConcierto.precio_min}€ </label>
                    <input id="desde-${datosConcierto.id}" class="spinner"/>
                  </div>
                  <div class="carro">
                  <i role="button" nombre="${artistaNombre}" fecha="${datosConcierto.fecha}" municipio="${datosUbicacion.municipio}" precio="${
      datosConcierto.precio_min
    }" concierto="${datosConcierto.id}" class="fa-solid fa-cart-plus desde"></i>
                  </div>
                </div>
              </li>
              <li>
                <div class="formulario my-1" id="form-hasta-${datosConcierto.id}">
                  <div class="precio">
                    <label for="hasta-${datosConcierto.id}">Hasta ${datosConcierto.precio_max}€ </label>
                    <input id="hasta-${datosConcierto.id}" url="${datosConcierto.id}" class="spinner"/>
                  </div>
                  <div class="carro">
                    <i role="button" nombre="${artistaNombre}" fecha="${datosConcierto.fecha}" municipio="${datosUbicacion.municipio}" precio="${
      datosConcierto.precio_max
    }" concierto="${datosConcierto.id}" class="fa-solid fa-cart-plus hasta"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="event_footer">
            <div class="event_date">
              <p>${capitalizeFirstLetter(new Date(datosConcierto.fecha).toLocaleDateString("es-ES", options))}</</p>
            </div>
          </div>
        </div>
        <div id="map${datosConcierto.id}" class="map"></div>
        </div>
        <div class="div-teloneros" id="teloneros${datosConcierto.id}"></div>
    </div>`
  );

  // Si el min es 0 se oculta
  if (datosConcierto.precio_min == 0) {
    $(`#form-hasta-${datosConcierto.id}`).hide();
  }

  spinners = $(".spinner");
  $(".spinner").each(function () {
    $(this).spinner({ min: 0, max: 10, step: 1 });
    $(this).val(0);
  });
  $(".ui-spinner").addClass("input-dark");
  // $(".ui-spinner-button").css("color", "white");
  // $(".ui-spinner-button").css("background-color", "#151515");

  // Se crea el mapa
  crearMapa(datosConcierto, datosUbicacion);
  var MIN = 0;
  var MAX = 10;
  $(".spinner").on("keyup", function (e) {
    var v = parseInt($(this).val());
    if (isNaN(v)) {
      return $(this).val(MIN);
    }
    if ($(this).val() < MIN) {
      $(this).val(MIN);
    } else if ($(this).val() > MAX) {
      $(this).val(MAX);
    } else {
      $(this).val(v);
    }
  });
}
// Funcion para formatear fecha
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AnadirACarrito(event) {
  if (logueado) {
    let concierto = $(event.currentTarget).attr("concierto");
    $(event.currentTarget).hasClass("desde") ? (desde_hasta = "desde") : (desde_hasta = "hasta");
    let cantidad = $(`#${desde_hasta}-${concierto}`).val();
    if (cantidad > 0) {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      let precio = $(event.target).attr("precio");
      let fecha = $(event.target).attr("fecha");
      let municipio = $(event.target).attr("municipio");
      let nombre = $(event.target).attr("nombre");
      let enCarrito = false;
      carrito.forEach((element, index) => {
        if (element.conciertoId == concierto && element.precio == precio) {
          item = element;
          enCarrito = true;
          nuevaCantidad = parseInt(element.cantidad) + parseInt(cantidad);
          alert(nuevaCantidad);
          if (nuevaCantidad <= 10) {
            MostrarToast("Cantidad de entradas sumadas");
            item.cantidad += cantidad;
            carrito.splice(index, 1);
            carrito.push(item);
          } else MostrarToast("No puedes comprar más de diez entradas a la vez", "red");
        }
      });
      if (!enCarrito) {
        carrito.push({ conciertoId: concierto, nombre: nombre, municipio: municipio, fecha: fecha, cantidad: cantidad, precio: precio });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        MostrarToast("Entrada añadida al carrito");
      }
    } else {
      MostrarToast("El número de entradas tiene que ser mayor a 0", "red");
    }
  } else {
    MostrarToast("Tienes que loguearte para guardar items en el carrito", "red");
  }
}
