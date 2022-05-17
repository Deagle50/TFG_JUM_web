import L from "leaflet";
import { marker } from "leaflet";

var zoom = 22;
var map = "";

function crearMapa(datosConcierto, datosUbicacion) {
  map = L.map(`map${datosConcierto.id}`).setView([datosUbicacion.lat, datosUbicacion.long], zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  MostrarMarcadores(datosUbicacion);
  $(".map").css("z-index", 0);
}

function MostrarMarcadores(datosUbicacion) {
  const marker = new L.marker([datosUbicacion.lat, datosUbicacion.long])
    .bindPopup(datosUbicacion.direccion)
    .addTo(map)
    .on("click", function () {});
}

window.crearMapa = crearMapa;
