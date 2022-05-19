async function cargarArtista() {
  artistaSeleccionado = localStorage.getItem("artistaSeleccionado");
  settings.url = url + "artistas/" + artistaSeleccionado;

  getArtista(artistaSeleccionado).then((response) => {
    document.title = response.nombre;

    $(".bg-image").css("background-image", `linear-gradient(transparent, #000 70%), url(${url}images/${artistaSeleccionado}.jpg)`);

    let descripcion = response.descripcion || "";
    let descMaxLength = 1000;
    if (descripcion.length > descMaxLength) {
      let desc2 = descripcion.slice(descMaxLength);
      descripcion = descripcion.slice(0, descMaxLength + desc2.indexOf(".") + 1);
    }

    $("#artistaTitulo").append(
      `<div id="${response.id}" class="item">
        <h1>${response.nombre}</h1>
        <p>${descripcion}</p>
      </div>`
    );
    cargarVideoArtista(response.nombre);
    $("#artista").text("Próximos conciertos de " + response.nombre);
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

  getConciertosArtista(artistaSeleccionado)
    .then((conciertos) => {
      const ms_minuto = 60000;

      conciertos.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.fecha) - new Date(a.fecha);
      });

      $("#count").text(conciertos.length + " conciertos encontrados.");
      conciertos.forEach((concierto) => {
        getSala(concierto.salaId).then((sala) => {
          mostrarConciertos(concierto, sala);

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

function mostrarConciertos(datosConcierto, datosUbicacion) {
  var options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };

  $("#conciertos").append(
    `
    <div class="card col-lg-6 col-md-8 col-sm-12 col-xs-12">
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
                  <i role="button" precio="${datosConcierto.precio_min}" concierto="${datosConcierto.id}" class="fa-solid fa-cart-plus desde"></i>
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
                    <i role="button" precio="${datosConcierto.precio_max}" concierto="${datosConcierto.id}" class="fa-solid fa-cart-plus hasta"></i>
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
    </div>
    `
  );

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
      carrito.push({ conciertoId: concierto, cantidad: cantidad, precio: precio });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      console.log("AÑADIDO AL CARRITO: " + concierto + " " + cantidad + " " + precio);
      MostrarToast("Entrada añadida al carrito");
    } else {
      MostrarToast("El número de entradas tiene que ser mayor a 0", "red");
    }
  } else {
    MostrarToast("Tienes que loguearte para guardar items en el carrito", "red");
  }
}
