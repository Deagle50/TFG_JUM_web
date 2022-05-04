var url = "http://148.3.87.123:6745/";
var url_interna = "http://192.168.0.16:6745/";
url = url_interna;

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxNjk4MDExLCJleHAiOjE2NTE3ODQ2NzF9.jY7H48hO8yjzQ4uoaXwQBFIIylHtWGYkOKb6MHJ_iZs";

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
    "access-token": token,
  },
  body: {
    usuario: usuario,
    artistaId: "",
  },
};

let artistaSeleccionado = "";
