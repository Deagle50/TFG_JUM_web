// Traduccion generos para filtro
const generosPrincipales = [
  { key: "all", value: "Todos" },
  { key: "rock", value: "Rock" },
  { key: "pop", value: "Pop" },
  { key: "flamenco", value: "Flamenco" },
  { key: "ska", value: "Ska" },
  { key: "reggae", value: "Reggae" },
  { key: "punk", value: "Punk" },
  { key: "electro", value: "Electro" },
  { key: "disco", value: "Disco" },
];

var todosArtistas;
// Se carga la pantalla principal con el carousel, filtro y galeria
function mostrarCarouselYGaleria(artistas) {
  mostrarCarousel(artistas);
  mostrarFiltroGaleria();
  mostrarGaleria(artistas);
}
// Creamos carousel
function mostrarCarousel(artistas) {
  $(".carousel-inner").html("");
  artistas.forEach((element) => {
    $(".carousel-inner").append(
      `<div id="${element.id || element.artistaId}" class="item">
          <div class="col-xs-4"><img id="carousel-${element.id || element.artistaId}" src="${url}images/${
        element.id || element.artistaId
      }.jpg" class="img-responsive img-carousel" url="${element.id || element.artistaId}" title="${element.nombre || element.id || element.artistaId}" alt="${
        element.id || element.artistaId
      }"/></div>
        </div>`
    );
  });
  // Intervalo del carrousel
  $(".multi-item-carousel").carousel({
    interval: 2500,
  });
  // Movimiento del carrousel
  $(".multi-item-carousel .item").each(function () {
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(":first");
      $(next).addClass("active");
    }
    next.children(":first-child").clone().appendTo($(this));

    if (next.next().length > 0) {
      next.next().children(":first-child").clone().appendTo($(this));
    } else {
      $(this).siblings(":first").children(":first-child").clone().appendTo($(this));
    }
  });

  $(".img-carousel").on("click", (event) => {
    localStorage.setItem("artistaSeleccionado", $(event.target).attr("url"));
    window.location= "artista.html";
  });
}
// Se crea la galeria de artistas
function mostrarGaleria(artistas) {
  $("#galeria").empty();
  artistas.forEach((element) => {
    $("#galeria").append(
      `<a href="artista.html" style="position:relative">
      <img src="${url}images/${element.id}.jpg" class="img-responsive img-galeria" id="galeria-${element.id}" url="${element.id}" title="${element.nombre}" alt="${element.nombre}"/>
      <div style="position:absolute;top:10px;right:10px;">
      <i id="heart${element.id}" artista="${element.id}" class="fa-regular fa-heart fa-xl"></i>
      </div>
      </a>`
    );
  });
  mostrarPreferencias();

  // Control click icono corazon
  $(".fa-heart").on("click", (event) => {
    event.preventDefault();
    if (logueado)
      if ($(event.target).hasClass("fa-regular")) {
        // Añadir preferencia
        $(event.target).removeClass("fa-regular");
        $(event.target).addClass("fa-solid");

        postPreferencia(usuario, $(event.target).attr("artista"));
      } else {
        // Quitar preferencia
        $(event.target).addClass("fa-regular");
        $(event.target).removeClass("fa-solid");
        deletePreferencia(usuario, $(event.target).attr("artista"));
      }
    else MostrarToast("Tienes que loguearte para poder guardar favoritos");
  });
  // Click redireccion sobre una imagen de artista de la galeria
  $(".img-galeria").on("click", (event) => {
    localStorage.setItem("artistaSeleccionado", $(event.target).attr("url"));
  });
}
// Se crean los botones filtros de galeria
function mostrarFiltroGaleria() {
  generosPrincipales.forEach((element) => {
    $(".filtros").append(`<button type="button" class="control" data-filter="${element.key}">${element.value}</button>`);
  });

  // Filtros género
  $(".control").on("click", (event) => {
    $(".control").removeClass("control-active");
    $(event.target).addClass("control-active");
    let artistas = filtrarArtistas($(event.target).attr("data-filter"));
    mostrarGaleria(artistas);
  });
  // Filtro por boton search
  $("#btnSearch").on("click", () => {
    var texto = $("#txtSearch").val();
    let artistas = buscarArtista(texto);
    mostrarGaleria(artistas);
  });
  // Filtro change
  $("#txtSearch").on("change", () => {
    var texto = $("#txtSearch").val();
    let artistas = buscarArtista(texto);
    mostrarGaleria(artistas);
  });
}
// Se cargan las preferencias del usuario en funcion de lo guardado
function mostrarPreferencias() {
  if (logueado)
    getPreferencias(usuario).then((preferencias) => {
      $(".fa-heart").removeClass("fa-solid");
      $(".fa-heart").addClass("fa-regular");

      // Si el usuario tiene preferencias se visualizaran en el carousel
      if (preferencias.length > 0) {
         mostrarCarousel(preferencias);
        preferencias.forEach((element) => {
          $(`#heart${element.artistaId}`).removeClass("fa-regular");
          $(`#heart${element.artistaId}`).addClass("fa-solid");
        })
      }
    });
}
// Se eliminan las preferencias
function borrarPreferencias() {
  $(".fa-solid").addClass("fa-regular").removeClass("fa-solid");
}

// Filtrar por botones de genero
function filtrarArtistas(genero) {
  if (genero == "all") return todosArtistas;
  var artistasFiltrados = [];
  todosArtistas.forEach((element) => {
    if (element.generos.split(",").includes(genero)) {
      artistasFiltrados.push(element);
    }
  });
  return artistasFiltrados;
}

// Filtrar por nombre del input search
function buscarArtista(texto) {
  var artistasFiltrados = [];
  todosArtistas.forEach((element) => {
    if (element.nombre.toUpperCase().indexOf(texto.toUpperCase()) > -1) {
      artistasFiltrados.push(element);
    }
  });
  return artistasFiltrados;
}
