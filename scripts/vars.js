var url = "http://148.3.87.123:6745/";
var url_interna = "http://192.168.0.200:6745/";
var url_local = "http://localhost:6745/";
var cole = "http://10.10.17.164:6745/";
// url = url_local;
// url = cole;
let token;
// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyMjc5NDEyLCJleHAiOjE2NTIzNjYwNzJ9._Pr9ONAJ5i93bopwJkn8zfPAsvoUm2Wks8HWpptRyek";

var logueado = false;

let usuario = localStorage.getItem("usuario") || null;

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
