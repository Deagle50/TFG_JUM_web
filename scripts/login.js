function mostrarLogin() {
  // Se cierra el div login/registro y deja todo listo para futuro inicio como login
  if ($("#sLoginRegistro").is(":visible")) {
    mostrarMenu("#sLoginRegistro");
    $("#aRegistrarse").removeClass("active").addClass("inactive");
    $("#aLogin").removeClass("inactive").addClass("active");
  } else {
    mostrarMenu("#sLoginRegistro");
    $("#fLogin").removeClass("d-none");
  }
}
//Validador de si los campos se han rellenado
function validar(campo) {
  if (campo == "") {
    return false;
  }
  return true;
}
// Guardar los datos
function guardarDatos(usu, contrasena, nombre, apellido, fnac, email, esRegistro) {
  // Si todos los datos a introducir son validos se realiza el post

  console.log(esRegistro);
  if (validar(usu) && validar(contrasena) && validar(nombre) && validar(apellido) && validar(fnac) && validar(email)) {
    var usuario = {
      usuario: usu,
      contrasena: contrasena,
      nombre: nombre,
      apellido: apellido,
      fnac: fnac,
      email: email,
    };

    if (esRegistro) {
      postRegistro(usuario).then(() => {
        MostrarToast("Registro correctamente realizado");
        loguearUsuario(usuario.usuario, contrasena);
      });
    } else {
      postUsuario(usuario).then(() => {
        MostrarToast("Tus datos de usuario se han actualizado");
        $("#nombre-usuario").text(usuario.nombre);
        despuesDeLogin();
      });
    }
  } else {
    MostrarToast("Rellena todos los campos", "red");
  }
}
// Se loguea el usuario, pasandole el usuario y contrasena
function loguearUsuario(user, pass) {
  login(user, pass).then((resp) => {
    usuario = user;
    token = resp.token;
    // Colocamos en el icono de usuario el nombre de usuario
    $("#nombre-usuario").text(usuario);
    despuesDeLogin();
  });
}
// Funcion para cerrar la conexion del usuario logueado
function logout() {
  logueado = false;
  // Se borra el usuario del localStorage
  localStorage.removeItem("usuario");
  // Se envia el usuario para eliminar el token
  deleteToken(usuario);
  usuario = "";
  token = "";
  // Cambiamos el texto del boton login
  $("#nombre-usuario").text("Inicia sesión");
  if (!window.location.href.includes("artista")) borrarPreferencias();
  $("#profileDiv").addClass("d-none");
  // Escondemos el carrito
  $("#carritoButton").addClass("d-none");

  // BORRAR CARRITO
  localStorage.removeItem("carrito");

  location.reload();
  return false;
}
// Se inicializa el usuario y sus opciones
function despuesDeLogin() {
  getApiAuth.headers["access-token"] = token;
  logueado = true;
  // Visualizamos carrito
  $("#carritoButton").removeClass("d-none");
  carrito();
  postToken(usuario, token);
  localStorage.setItem("usuario", usuario);
  if (!window.location.href.includes("artista")) mostrarPreferencias();
  OcultarMenu();
}

// Se cargan todas las opciones del menu para interactuar del usuario
function mostrarMenuCompleto() {
  // Visualizar el mensaje en el boton de usuario en funcion de estar logueado o no
  if (usuario) {
    $("#nombre-usuario").text(usuario);
  } else {
    $("#nombre-usuario").text("Inicia sesión");
  }
  // Opciones ocultas de interaccion
  $("#topMenu").html(`
      <section id="sLoginRegistro" class="d-none">
          <div class="nav w-100 d-flex justify-content-around">
            <ul class="links">
              <li><a id="aLogin" class="btn active">Iniciar sesión</a></li>
              <li><a id="aRegistrarse" class="btn inactive">Registrarse</a></li>
            </ul>
          </div>
          <form class="d-none" id="fLogin">
            <div class="user-box">
              <input type="text" id="textUser" name="textUser" required />
              <label>Usuario</label>
            </div>
            <div class="user-box">
              <input type="password" id="textPassword" name="textPassword" required />
              <label>Contraseña</label>
            </div>
            <a href="#" id="btnLogin">
              Entrar
            </a>
          </form>
          <form class="d-none" id="fRegistrarse">
            <div class="user-box">
              <input type="text" id="textNombre" name="textNombre" required />
              <label>Nombre</label>
            </div>
            <div class="user-box">
              <input type="text" id="textApellido" name="textApellido" required />
              <label>Apellido</label>
            </div>
            <div class="user-box">
              <input type="text" id="textFnac" class="datepicker" name="textFnac" required />
              <label>Fecha de nacimiento</label>
            </div>
            <div class="user-box">
              <input type="email" id="textEmail" name="textEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
              <label>Email</label>
            </div>
            <div class="user-box">
              <input type="text" id="textUsuario" name="textUsuario" size="15" pattern="([A-Za-z]{1,})" maxlength="20" autofocus required />
              <label>Usuario</label>
            </div>
            <div class="user-box">
              <input type="password" id="textContrasena" name="textContrasena" required />
              <label>Contraseña</label>
            </div>
            <a href="#" id="btnRegistrarse">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Registrarse
            </a>
          </form>
        </div>
      </section>
      <section id="sPerfil" class="d-none">
          <div class="nav w-100 d-flex justify-content-around">
            <h2>Perfil</h2>
          </div>
          <form id="fDatos">
            <div class="user-value">
              <label>Nombre</label>
              <input type="text" id="mostrarTextNombre" name="mostrarTextNombre" required />
            </div>
            <div class="user-value">
              <label>Apellido</label>
              <input type="text" id="mostrarTextApellido" name="mostrarTextApellido" required />
            </div>
            <div class="user-value">
              <label>Email</label>
              <input type="email" id="mostrarTextEmail" name="mostrarTextEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required />
            </div>
            <div class="user-value">
              <label>Fecha de nacimiento</label>
              <input type="text" id="mostrarTextFnac" class="datepicker" readonly name="mostrarTextFnac" required />
            </div>
            <div class="user-value">
              <label>Usuario</label>
              <input type="text" id="mostrarTextUsuario" name="mostrarTextUsuario" readonly size="15" pattern="([A-Za-z]{1,})" maxlength="20" autofocus required />
            </div>
            <div class="user-value">
              <button type="button" id="btnEliminar"> Eliminar preferencias </button>
            </div>
            <a href="#" id="btnCancelar"> Cancelar </a>
            <a href="#" id="btnGuardar"> Guardar </a>
          </form>
        </div>
      </section>
      <section id="sEntradas" class="d-none">
          <div class="nav w-100 d-flex justify-content-around">
            <h2>Mis compras</h2>
          </div>
          <div id="entradas"></div>
         <div>
         </div>
      </section>

      <section id="sCarrito" class="d-none">
          <div class="nav w-100 d-flex justify-content-around">
            <h2>Mi carrito</h2>   
          </div>
          <div id="carritoItems">

          </div>
          <a href="#" id="btnVaciar" class="btnCarrito"> Vaciar </a>
          <a href="#" id="btnComprar" class="btnCarrito"> Comprar</a>        
      </section>      
    `);

  $("body").append(`<div id="blur" role="button" class="d-none" ></div>`);
  $("#blur").on("click", (event) => {
    event.preventDefault();
    OcultarMenu();
  });
  // Click al darle al titulo de Login (visualiza el login)
  $("#aLogin").on("click", () => {
    if ($("#fRegistrarse").is(":visible")) {
      $("#fRegistrarse").addClass("d-none");
      $("#aRegistrarse").removeClass("active").addClass("inactive");
      $("#aLogin").removeClass("inactive").addClass("active");
    }
    $("#fLogin").removeClass("d-none");
  });

  // Click al darle al titulo de Registrarse (visualiza el formulario registrarse)
  $("#aRegistrarse").on("click", () => {
    if ($("#fLogin").is(":visible")) {
      $("#fLogin").addClass("d-none");
      $("#aLogin").removeClass("active").addClass("inactive");
      $("#aRegistrarse").removeClass("inactive").addClass("active");
    }
    $("#fRegistrarse").removeClass("d-none");
  });

  // Al clickar en el boton del formulario Login se realiza el logueo
  $("#btnLogin").on("click", () => {
    var user = $("#textUser").val();
    var password = $("#textPassword").val();
    if (validar(user) && validar(password)) {
      loguearUsuario(user, password);
    } else {
      MostrarToast("Rellena todos los campos");
    }
  });

  // Al clickar en el boton del formulario Registrarse se realiza el registro del nuevo usuario
  $("#btnRegistrarse").on("click", () => {
    var usu = $("#textUsuario").val();
    var contrasena = $("#textContrasena").val();
    var nombre = $("#textNombre").val();
    var apellido = $("#textApellido").val();
    var fnac = $("#textFnac").val();
    var email = $("#textEmail").val();
    guardarDatos(usu, contrasena, nombre, apellido, fnac, email, true);
  });

  // Calendario
  $(".datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
  });
}
