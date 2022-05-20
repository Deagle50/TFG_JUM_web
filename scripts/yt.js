function mostrarVideoArtista(artistaNombre) {
  getVideoArtista(artistaNombre).then((resp) => {
    $(`#player`).html(`
      <iframe width="420" height="315" allow="fullscreen;"
        src=${resp.url}>
      </iframe>
    `);
  });
}
