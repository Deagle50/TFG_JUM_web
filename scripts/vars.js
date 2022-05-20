// Puertos segun la api (web/yout)
const puerto = 6745;
const puerto_yt = 6746;
// Direccion de ip en función de la conexión
// var url = "http://148.3.87.123:" + puerto + "/";
var url = "http://137.101.237.98:" + puerto + "/";
var url_interna = "http://192.168.0.200:" + puerto + "/";
var url_local = "http://localhost:" + puerto + "/";
var cole = "http://10.10.17.164:" + puerto + "/";
// url = url_local;
// url = cole;

// var url_yt = "http://148.3.87.123:" + puerto_yt + "/";
var url_yt = "http://137.101.237.98:" + puerto_yt + "/";
var url_interna_yt = "http://192.168.0.200:" + puerto_yt + "/";
var url_local_yt = "http://localhost:" + puerto_yt + "/";
var cole_yt = "http://10.10.17.164:" + puerto_yt + "/";
url_yt = url_local_yt;

let token;
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyMjc5NDEyLCJleHAiOjE2NTIzNjYwNzJ9._Pr9ONAJ5i93bopwJkn8zfPAsvoUm2Wks8HWpptRyek";

var logueado = false;

let usuario = localStorage.getItem("usuario") || null;
// Conexion base api
let settings = {
  url: url,
  method: "GET",
  timeout: 0,
  contentType: "application/x-www-form-urlencoded; charset=utf-8",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    crossDomain: true,
    // "access-token": token,
  },
  body: {
    usuario: usuario,
    artistaId: "",
  },
};

let artistaSeleccionado = "";
