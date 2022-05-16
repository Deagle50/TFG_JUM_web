$(document).on("ready", () => {
  cargarArtista();
});

async function cargarArtista() {
  artistaSeleccionado = localStorage.getItem("artistaSeleccionado");
  settings.url = url + "artistas/" + artistaSeleccionado;

  getArtista(artistaSeleccionado).then((response) => {
    $(".bg-image").css("background-image", `linear-gradient(transparent, #000 70%), url(${url}images/${artistaSeleccionado}.jpg)`);

    $("#artistaTitulo").append(
      `<div id="${response.id}" class="item">
        <h1>${response.nombre}</h1>
        <p>${response.descripcion || ""}</p>
      </div>`
    );
    $("#artista").text("Próximos conciertos de " + response.nombre);
  });

  settings.url = url + "conciertosArtista/" + artistaSeleccionado;

  getConciertosArtista(artistaSeleccionado)
    .then((conciertos) => {
      $("#count").text("Cantidad de conciertos " + conciertos.length);

      // conciertos.sort(function (a, b) {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.fecha) - new Date(a.fecha);
      // });
      conciertos.forEach((concierto) => {
        getTelonerosconcierto(concierto.id).then((teloneros)=> {       }).catch(() => {teloneros="No hay teloneros"});
        getSala(concierto.salaId).then((sala) => {
          mostrarConciertos(concierto, sala);
        });
      });
      let fecha = conciertos[0].fecha || null;
      document.getElementById("contador").innerHTML = fecha;
      countdown(fecha, "contador");

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
      alert("Fin de la cuenta " + element);
    }
  }, 1000);
};

function mostrarConciertos(datosConcierto, datosUbicacion, datosTeloneros) {
  $("#conciertos").append(
    `<div id="d${datosConcierto.id}"  class="event_container">
      <div class="event_info">
        <div class="event_title">
          <h4>${datosUbicacion.nombre}, ${datosUbicacion.municipio}</h4>
        </div>
        <div class="event_desc">
        <ul>
        <li>${datosUbicacion.direccion}<li>
        <li>Desde ${datosConcierto.precio_min}€</li>
        <input type="number" min="0" max="8"></input>
        <li>Hasta ${datosConcierto.precio_max}€</li>
        <input type="number" min="0" max="8"></input>
        </ul>
        </div>
        <div class="event_footer">
          <div class="event_date">
            <p>${datosConcierto.fecha}</</p>
          </div>
          <div class="event_more">
              
          </div>
        </div>
      </div>
      <div id="map${datosConcierto.id}" class="map"></div>
  </div>
    `
    /*
    <button id="${datosConcierto.id}" type="button" class="btn _more">
                Mapa
              </button>
    */
  );
  crearMapa(datosConcierto, datosUbicacion);

  // $(`#${datosConcierto.id}`).click(() => {
  //   $(`#map${datosConcierto.id}`).toggle();
  // });
}
