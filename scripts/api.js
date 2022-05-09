//let url = "http://10.10.17.164:3000/artistas";

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