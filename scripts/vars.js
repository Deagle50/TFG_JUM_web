var url = "http://148.3.87.123:6745/";
var url_interna = "http://192.168.0.200:6745/";
var url_local = "http://10.10.17.164:6745/";
//url = url_local;

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyMTk4MDg5LCJleHAiOjE2NTIyODQ3NDl9.Gju2K1TwdqMhqnVVNybfv9mTqiHX_f0GnDv2asl9Xv0";

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
