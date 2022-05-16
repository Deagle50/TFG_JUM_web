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
        getSala(concierto.salaId).then((sala) => {
          mostrarConciertos(concierto, sala);
          getTelonerosConcierto(concierto.id).then((teloneros)=>{
            if(teloneros.length>0){
              $(`#teloneros${concierto.id}`).append(`<p>Teloneros:</p>`)
              teloneros.forEach(telonero => {
                getArtista(telonero.artistaId).then((artista)=>{
                  $(`#teloneros${concierto.id}`).append(`
                  <div id="telonero${artista.id}" class="teloneros" style="padding:5px; margin-left:15px" role="button"> 
                  <img src="${url}images/${artista.id}.jpg" style="height:40px; border-radius:5px" alt="Telonero ${artista.nombre}">
                  <span>${artista.nombre}. Tiempo: ${telonero.fecha} mins</span>
                  </div>
                  `);
                  $(`#telonero${artista.id}`).attr("url", artista.id);
                  $(`#telonero${artista.id}`).on("click", (event)=>{
                    localStorage.setItem("artistaSeleccionado", $(event.currentTarget).attr("url"));
                    window.location = "artista.html"
                  })
                })
              });
            }
          })          
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

function mostrarConciertos(datosConcierto, datosUbicacion) {
  $("#conciertos").append(
    `
    <div class="d-flex flex-column col-md-6" style="border: solid 1px #ad67d6; margin-bottom:30px; border-radius:25px;padding:0px; background-color:#151515;">
      <div id="d${datosConcierto.id}"  class="event_container" style="border:none">
        <div class="event_info">
          <div class="event_title">
            <h4>${datosUbicacion.nombre}, ${datosUbicacion.municipio}</h4>
          </div>
          <div class="event_desc">
          <ul>
          <li>${datosUbicacion.direccion}<li>
          <li>Desde ${datosConcierto.precio_min}€ <input type="number" min="0" max="8" value="0"></input></li>
          <li>Hasta ${datosConcierto.precio_max}€  <input type="number" min="0" max="8" value="0"></input></li>
          <button id="comprar${datosConcierto.id}" type="button" class="btn _more" style="color:#ad67d6;">
          Comprar
          </button>
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
        <div class="div-teloneros" id="teloneros${datosConcierto.id}"></div>
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
