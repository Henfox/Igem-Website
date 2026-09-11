// jQuery-Plugin: rendert Slides in das gewählte Element
(function ($) {
  $.fn.renderSponsorSlides = function (items) {
    const $root = this;
    const $frag = $(document.createDocumentFragment());

    items.forEach((it) => {
      const $img = $("<img>", {
        src: it,
        alt: "Logo",
        loading: "lazy"
      });
      $frag.append($("<div>", { "class": "box" }).append($img));
    });

    $root.empty().append($frag);
    return this; 
  };
})(jQuery);

// Beim Laden ausführen
$(function () {
  $("#sponsor_grid").renderSponsorSlides(sponsors);
});