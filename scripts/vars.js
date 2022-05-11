var url = "http://148.3.87.123:6745/";
var url_interna = "http://192.168.0.200:6745/";
var url_local = "http://localhost:6745/";
url = url_local;

// let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyMjY2Mzg1LCJleHAiOjE2NTIzNTMwNDV9.FLIE5uH3XjvYaucpCRMId44gUxzjPIT-q0LI7o6D0sA";

let usuario = "Deagle50";

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
