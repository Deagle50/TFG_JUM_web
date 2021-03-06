// Autentificacion api
var getApiAuth = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
    "access-token": token,
  },
};

// Api
var getApi = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
  },
};

// Eliminacion autentificacion
var deleteApiAuth = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "",
    "access-token": token,
  },
};

/**
 * Login conexion
 * @param {*} usuario
 * @param {*} contrasena
 */
async function login(usuario = "Deagle50", contrasena = "Deagle50") { 
  try {
    const rawResponse = await fetch(url + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      body: JSON.stringify({
        usuario: usuario,
        contrasena: contrasena,
      }),
    });
    if (!rawResponse.ok) {
      console.log(rawResponse);
      throw new Error(`Error! status: ${rawResponse.status}`);
    }
    const content = await rawResponse.json();
    console.log(content);
    return content;
  } 
  catch (error) {
    return false;
  }
}
// obtencion de usuario
async function getUsuario(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "usuarios/" + usuario, getApiAuth);
  const content = await rawResponse.json();

  console.log(content);
  return content[0];
}

/**
 * Registrarse datos
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
async function postRegistro(
  usuario = {
    usuario: "Deagle52",
    contrasena: "Deagle50",
    nombre: "Nombre",
    apellido: "APellido",
    fnac: "1999-05-01",
    email: "asdlkaj@ajsdl.com",
  }
) {
  const rawResponse = await fetch(url + "registro", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
    body: JSON.stringify({
      usuario: usuario.usuario,
      contrasena: usuario.contrasena,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fnac: usuario.fnac,
      email: usuario.email,
    }),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

/**
 * Modificar datos
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
async function postUsuario(
  usuario = {
    usuario: "Deagle50",
    contrasena: "Deagle50",
    nombre: "Nombre",
    apellido: "APellido",
    fnac: "1999-05-01",
    email: "asdlkaj@ajsdl.com",
  }
) {
  const rawResponse = await fetch(url + "usuarios", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
      "access-token": token,
    },
    body: JSON.stringify({
      usuario: usuario.usuario,
      contrasena: usuario.contrasena,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fnac: usuario.fnac,
      email: usuario.email,
    }),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

// Obtener token
async function getToken(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "tokens/" + usuario, getApi);
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

/**
 * Enviar token
 *
 * @param {*} usuario
 * @param {*} token
 */
async function postToken(
  usuario = "Deagle50",
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjUyMjY2Mzg1LCJleHAiOjE2NTIzNTMwNDV9.FLIE5uH3XjvYaucpCRMId44gUxzjPIT-q0LI7o6D0sA"
) {
  const rawResponse = await fetch(url + "tokens", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      "Access-Control-Allow-Origin": "",
    },
    body: JSON.stringify({ usuario: usuario, token: token }),
  });
  const content = await rawResponse.json();

  return content;
}

// Eliminar token
async function deleteToken(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "tokens/" + usuario, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
      "access-token": token,
    },
  });
  const content = await rawResponse;
  return content;
}

/**
 * Obtener las compras del usuario
 * @param {*} usuario
 */
async function getCompras(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "compras/" + usuario, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
      "access-token": token,
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

/**
 * Subir compra
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
async function postCompra(
  compra = {
    compraId: "asdadasdas",
    usuario: "Deagle50",
    conciertoId: "062BCE60-3E15-48A1-8B97-5700C70BE69A",
    fecha: "1999-05-01",
    cantidad: 3,
    precio: 34.5,
  }
) {
  const rawResponse = await fetch(url + "compras", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      "Access-Control-Allow-Origin": "",
    },
    body: JSON.stringify({
      compraId: compra.compraId,
      usuario: compra.usuario,
      conciertoId: compra.conciertoId,
      fecha: compra.fecha,
      cantidad: compra.cantidad,
      precio: compra.precio,
    }),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

// Obtener todos los artistas
async function getArtistas() {
  const rawResponse = await fetch(url + "artistas/", getApiAuth);
  const content = await rawResponse.json();

  return content;
}

// Obtener un artista determinado
async function getArtista(artistaId = "UC1fab2nJ6Gk6G1drkzagxYg") {
  const rawResponse = await fetch(url + "artistas/" + artistaId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  return content;
}

// Obtener conciertos
async function getConciertos() {
  const rawResponse = await fetch(url + "conciertos/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

// Obtener concierto determinado
async function getConcierto(conciertoId = "062BCE60-3E15-48A1-8B97-5700C70BE69A") {
  const rawResponse = await fetch(url + "conciertos/" + conciertoId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  return content;
}

// Obtener conciertos de un artista determinado
async function getConciertosArtista(artistaId = "UC1fab2nJ6Gk6G1drkzagxYg") {
  const rawResponse = await fetch(url + "conciertosArtista/" + artistaId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  return content;
}

/**
 * Obtener las preferencias del usuario
 * @param {*} usuario
 */
async function getPreferencias(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "preferencias/" + usuario, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
      "access-token": token,
    },
  });
  const content = await rawResponse.json();
  return content;
}

/**
 * Subir preferencia
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
async function postPreferencia(usuario = "Deagle50", artistaId = "UC4JNeITH4P7G51C1hJoG6vQ") {
  const rawResponse = await fetch(url + "preferencias", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      "Access-Control-Allow-Origin": "",
    },
    body: JSON.stringify({ usuario: usuario, artistaId: artistaId }),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}

/**
 * Elimina la preferencia
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
async function deletePreferencia(usuario = "Deagle50", artistaId = "UC4JNeITH4P7G51C1hJoG6vQ") {
  const rawResponse = await fetch(url + "preferencias", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      "Access-Control-Allow-Origin": "",
    },
    body: JSON.stringify({ usuario: usuario, artistaId: artistaId }),
  });
  const content = await rawResponse;

  console.log(content);
  return content;
}

/**
 * Elimina todas las preferencias
 *
 * @param {*} usuario
 */
async function deletePreferencias(usuario = "Deagle50") {
  const rawResponse = await fetch(url + "preferencias/" + usuario, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": token,
      "Access-Control-Allow-Origin": "",
    },
    //   body: JSON.stringify({ usuario: usuario, artistaId: artistaId }),
  });
  const content = await rawResponse;

  console.log(content);
  return content;
}

// Obtener sala determinada
async function getSala(id = "doka_donostia") {
  const rawResponse = await fetch(url + "salas/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  return content;
}

// Obtener teloneros
async function getTeloneros() {
  const rawResponse = await fetch(url + "teloneros/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}
// Obtener conciertos de un telonero determinado
async function getConciertosTelonero(artistaId = "UCu6ct4LWh-sMXxQpreWDY_g") {
  const rawResponse = await fetch(url + "teloneros/" + artistaId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
}
// Obtener teloneros de un concierto determinado
async function getTelonerosConcierto(conciertoId = "062BCE60-3E15-48A1-8B97-5700C70BE69A") {
  const rawResponse = await fetch(url + "telonerosConcierto/" + conciertoId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();
  return content;
}
// Obtener video de un artista determinado
async function getVideoArtista(nombreArtista = "ACDC") {
  let query = nombreArtista.replace("/", "");
  query = query.replace(" ", "");
  const rawResponse = await fetch(url_yt + "buscar/" + query, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "",
    },
  });
  const content = await rawResponse.json();
  console.log(content);
  return content;
}
