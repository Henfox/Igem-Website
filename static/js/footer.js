
const STATIC_SPONSORS_BASE = "static/sponsors/";

const sponsors_svg =[
"Carl_Roth.svg",
"Eppendorf.svg",
"Merck.svg",
"New-England-Biolabs.svg",
"Ratiolab.svg",
"RPTU.svg",
"Twist-Bioscience.svg",
"Zymo-Research.svg",
];

const sponsors_static = [
"acro-biosystems.webp",
"biocomp.webp",
"celldeg.webp",
"dunn.webp",
"element-5-2x.webp",
"freundeskreis-rptu.webp",
"isolab.webp",
"nippon-genetics-europe.webp",
"scat.webp",
"semadeni.webp",
"simplebiotech.webp",
"starlab.webp	",
"trialtus.webp",
"vitlab.webp",
"vwr-avantor.webp",
]


let sponsors = [];
sponsors_svg.forEach((item) => {
  sponsors.push(resolveSrc_SVG(item));
})

sponsors_static.forEach((item) => {
  sponsors.push(resolveSrc_Static(item,"sponsors/"));
})

shuffle(sponsors)
// Helper: finalen src ermitteln
function resolveSrc_SVG(item) {
  return STATIC_SPONSORS_BASE + item;
}

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

      const $a = $("<a>", {
        href: DEFAULT_HREF,
        target: "_blank",
        rel: "noopener"
      }).append($img);

      const $slide = $("<div>", { "class": "slide" })
        .append($("<div>", { "class": "image-box" }).append($a));
      $frag.append($slide);
    });

    $root.empty().append($frag);
    return this; // für chaining
  };
})(jQuery);

// Beim Laden ausführen
$(function () {
  $("#sponsor-slides").renderSponsorSlides(sponsors);
});
$(document).ready(function(){
    $('.image-slider').slick({
    centerMode: true,
    slidesToShow: 1,                  // nur 1 Haupt-Slide sichtbar
    centerPadding: 'calc(var(--width)/2)',            
    dots: true,
    arrows: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    focusOnSelect: true,              // Klick auf Rand-Slide fokussiert ihn
    responsive: [
      { breakpoint: 1200, settings: { centerPadding: '18vw' } },
      { breakpoint: 992,  settings: { centerPadding: '14vw' } },
      { breakpoint: 768,  settings: { centerPadding: '20vw', arrows: false } },
      { breakpoint: 560,  settings: { centerPadding: '12vw', arrows: false } }
    ],
    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-next" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>',
    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-prev" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>',

  });
});