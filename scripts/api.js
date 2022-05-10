/**
 * Subir preferencia
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
function postPreferencia(usuario = "Deagle50", artistaId = "UC4JNeITH4P7G51C1hJoG6vQ") {
  (async () => {
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
  })();
}

/**
 * Elimina la preferencia
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
function deletePreferencia(usuario = "Deagle50", artistaId = "UC4JNeITH4P7G51C1hJoG6vQ") {
  (async () => {
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
  })();
}

/**
 * Elimina la preferencia
 *
 * @param {*} usuario
 */
function deletePreferencias(usuario = "Deagle50") {
  (async () => {
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
  })();
}

/**
 * Subir preferencia
 *
 * @param {*} usuario
 * @param {*} artistaId
 */
function postRegistro(usuario
  // usuario = {
  //   usuario: "Deagle52",
  //   contrasena: "Deagle50",
  //   nombre: "Nombre",
  //   apellido: "APellido",
  //   fnac: "1999-05-01",
  //   email: "asdlkaj@ajsdl.com",
  // }
) {
  (async () => {
    const rawResponse = await fetch(url + "registro", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": token,
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
  })();
}
