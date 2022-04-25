$(document).on("ready", ()=>{
    settings.url = url + "artistas";
    $.ajax(settings).done(function(response) {
        todosArtistas = response;
        cargarCarouselYGaleria(response);
    });
});

//# sourceMappingURL=index.bc1e96c0.js.map
