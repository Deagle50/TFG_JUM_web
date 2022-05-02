$(document).ready(() => {
  console.log("LOAD");
  cargarArtista();
});

function cargarArtista() {
  artistaSeleccionado = localStorage.getItem("artistaSeleccionado");
  console.log("ID: " + artistaSeleccionado);
  settings.url = url + "artistas/" + artistaSeleccionado;
  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#artistaTitulo").append(
      `<img id="img${artistaSeleccionado}" src="${url}images/${artistaSeleccionado}.jpg" title="${response.nombre}"/>`
    );

    $("#artistaTitulo").append(
      `<div id="${response.id}" class="item">
        <img src="${url}images/${response.id}.jpg" alt="" class="img-responsive"/>
        <h1>${response.nombre}</h1>
        <p>${response.descripcion || "description placeholder"}</p>
      </div>`
    );

    document.getElementById("artista").innerHTML = "Próximos conciertos de " + response.nombre;
  });

  settings.url = url + "conciertosArtista/" + artistaSeleccionado;
  $.ajax(settings).done(function (conciertos) {
    conciertos.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.fecha) - new Date(a.fecha);
    });
    conciertos.forEach((concierto) => {
      settings.url = url + "salas/" + concierto.salaId;
      $.ajax(settings).done(function (sala) {
        mostrarConciertos(concierto, sala);
      });
    });

    let fecha = conciertos[0].fecha || null;
    document.getElementById("countdown1").innerHTML = fecha;
    countdown(fecha, "countdown1");
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
          <div class="row d-flex justify-content-center col-md-8 col-s-10 col-xs-12">
              <div class="col-lg-2">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.days}
                      </div>
                      <div class="concept">
                          Días
                      </div>
                  </div>
              </div>
              <div class="col-lg-2">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.hours}
                      </div>
                      <div class="concept">
                          Horas
                      </div>
                  </div>
              </div>
              <div class="col-lg-2">
                  <div class="countdown-container">
                      <div class="number">
                          ${currenTime.minutes}
                      </div>
                      <div class="concept">
                          Minutos
                      </div>
                  </div>
              </div>
              <div class="col-lg-2">
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

function mostrarConciertos(datosConcierto, datosUbicacion) {
  $("#conciertos").append(
    `<div id="${datosConcierto.id}" class="item concierto col-md-8 col-s-10 col-xs-12">
      <h3>${datosUbicacion.nombre}, ${datosUbicacion.municipio} </h3>
      <button type="button" class="btn" style='background-color:red'>Mapa</button>
      <div class="info">
      <div class="fecha">${datosConcierto.fecha}</div>
      <div class="min">Desde ${datosConcierto.precio_min}€</div>
      </div>
    </div>
    `
  );
}
