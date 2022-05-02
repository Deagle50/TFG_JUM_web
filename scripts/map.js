import L from "leaflet";
import { marker } from "leaflet";

var zoom = 8;

var map = L.map("map").setView([43.3125271, -1.8986133], zoom);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);