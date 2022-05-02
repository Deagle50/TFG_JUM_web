var url = "http://192.168.0.200:6745/";

$.getJSON("https://ipinfo.io/json?token=9853e4ad6cf8ae", function (data) {
  url = data.ip == "148.3.87.123" ? "http://192.168.0.200:6745/" : "http://148.3.87.123:6745/";
});

// const url = "http://10.10.17.164:3000/";
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
