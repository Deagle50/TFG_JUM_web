// const url = "http://192.168.0.16:3000/";
const url = "http://10.10.17.164:3000/";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUxNDcyMzk3LCJleHAiOjE2NTE1NTkwNTd9.hoIKWeMuifZ_kWl9UnPmMlPQYT_OzSJe7hxPPNhboK0";

var settings = {
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
