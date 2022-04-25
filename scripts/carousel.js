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
      `<a href="artista.html"><img src="${url}images/${element.id}.jpg" class="img-responsive img-galeria" id="galeria-${element.id}" url="${element.id}" title="${element.nombre}" alt="${element.nombre}"/></a>`
    );
  });

  $(".img-galeria").on("click", (event) => {
    localStorage.setItem("artistaSeleccionado", $(event.target).attr("url"));
  });
}

function cargarFiltroGaleria() {
  generosPrincipales.forEach((element) => {
    $(".filtros").append(
      `<button type="button" class="control" data-filter="${element.key}">${element.value}</button>`
    );
  });

  $(".control").on("click", (event) => {
    let artistas = filtrarArtistas($(event.target).attr("data-filter"));
    cargarGaleria(artistas);
  });
}

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
