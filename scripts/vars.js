var url = "http://148.3.87.123:6745/";
var url_interna = "http://192.168.0.200:6745/";
// url = url_interna;

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxNTEwNDY1LCJleHAiOjE2NTE1OTcxMjV9.uGTGjegExKYaiFyf8swuotRmKiM0y0pIIa4fsULjqxE";

let settings = {
  url: url,
  method: "GET",
  timeout: 0,
  headers: {
    Accept: "application/json",
    crossDomain: true,
    "access-token": token,
  },
};

let artistaSeleccionado = "";
