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

function cargarCarouselYGaleria(artistas) {
  cargarCarousel(artistas);
  cargarFiltroGaleria();
  cargarGaleria(artistas);
}

function cargarCarousel(artistas) {
  artistas.forEach((element) => {
    $(".carousel-inner").append(
      `<div id="${element.id}" class="item">
          <div class="col-xs-4"><img id="carousel-${element.id}" src="${url}images/${element.id}.jpg" class="img-responsive img-carousel" url="${element.id}" title="${element.nombre}" alt="${element.nombre}"/></div>
        </div>`
    );
  });
  // Intervalo del carrousel
  $(".multi-item-carousel").carousel({
    interval: false,
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
      //next.next().children(":first-child").clone().appendTo($(this));
    } else {
      $(this).siblings(":first").children(":first-child").clone().appendTo($(this));
    }
  });

  $(".img-carousel").on("click", (event) => {
    console.log($(event.target).attr("url"));
  });
}

function cargarGaleria(artistas) {
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
  settings.url = url + "preferencias/" + usuario;
  $.ajax(settings).then((preferencias) => {
    preferencias.forEach((element) => {
      $(`#heart${element.artistaId}`).removeClass("fa-regular");
      $(`#heart${element.artistaId}`).addClass("fa-solid");
    });
  });

  $(".fa-heart").on("click", (event) => {
    event.preventDefault();
    // Añadir preferencia
    if ($(event.target).hasClass("fa-regular")) {
      $(event.target).removeClass("fa-regular");
      $(event.target).addClass("fa-solid");

      postPreferencia(usuario, $(event.target).attr("artista"));
    } else {
      // Quitar preferencia
      $(event.target).addClass("fa-regular");
      $(event.target).removeClass("fa-solid");
      deletePreferencia(usuario, $(event.target).attr("artista"));
    }
  });

  $(".img-galeria").on("click", (event) => {
    localStorage.setItem("artistaSeleccionado", $(event.target).attr("url"));
  });
}

function cargarFiltroGaleria() {
  generosPrincipales.forEach((element) => {
    $(".filtros").append(`<button type="button" class="control" data-filter="${element.key}">${element.value}</button>`);
  });

  // Filtros género
  $(".control").on("click", (event) => {
    $(".control").removeClass("control-active");
    $(event.target).addClass("control-active");
    let artistas = filtrarArtistas($(event.target).attr("data-filter"));
    cargarGaleria(artistas);
  });
  // Filtro por boton search
  $("#btnSearch").on("click", () => {
    var texto = $("#txtSearch").val();
    let artistas = buscarArtista(texto);
    cargarGaleria(artistas);
  });

  $("#txtSearch").on("change", () => {
    var texto = $("#txtSearch").val();
    let artistas = buscarArtista(texto);
    cargarGaleria(artistas);
  });
}
// Filtrar por botones de genero
function filtrarArtistas(genero) {
  if (genero == "all") return todosArtistas;
  var artistasFiltrados = [];
  todosArtistas.forEach((element) => {
    if (element.generos.split(",").includes(genero)) {
      artistasFiltrados.push(element);
    } else {
    }
  });
  return artistasFiltrados;
}

// Filtrar por nombre del input search
function buscarArtista(texto) {
  var artistasFiltrados = [];
  todosArtistas.forEach((element) => {
    //Elimino espacios y combierto todo a mayuscula
    // if (element.nombre.toUpperCase().split(" ").join("") == artista.toUpperCase().split(" ").join("")) {
    //   artistaFiltrado.push(element);
    // }

    // a = li[i].getElementsByTagName("a")[0];
    // txtValue = a.textContent || a.innerText;
    // filter = input.value.toUpperCase();
    if (element.nombre.toUpperCase().indexOf(texto.toUpperCase()) > -1) {
      artistasFiltrados.push(element);
    }
  });
  return artistasFiltrados;
  // // Si no hay ninguno devolverá todos de nuevo
  // if (artistasFiltrados == "") {
  //   return todosArtistas;
  // } else {
  //   return artistasFiltrados;
  // }
}
