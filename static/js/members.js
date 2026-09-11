//Video Code

setupMultiplePeerTubeLoops([
  { iframe: document.getElementById('pt'), start: 56, end: 72 }
]);


// Slider Code
/*let images = []
for(let i = 1; i<=34 ; i++){
    if (i== 0 || i == 0){}else{ // TOBI HIER
    if(i<10){
        images.push("0"+i+".webp")
    }else{
        images.push(i+".webp")
    }}
} */

let images = [];
const skip = [26, 31, 32, 19, 21]; // <--- diese Bilder werden NICHT geladen

for (let i = 1; i <= 34; i++) {
  if (skip.includes(i)) continue; // Überspringt die ausgeschlossenen Nummern

  // TOBI HIER
  const filename = (i < 10 ? "0" + i : i) + ".webp";
  images.push(filename);
}
const templist = [];
images.forEach((image) => {
    
    templist.push(resolveSrc_Static(image,"teamimages/"));
});
images = templist;
shuffle(images);
  (function ($) {
  $.fn.renderImagesSlides = function (items) {
    const $root = this;
    const $frag = $(document.createDocumentFragment());

    items.forEach((it) => {
      const $img = $("<img>", {
        src: it,
        alt: "Image",
        loading: "lazy"
      });

      const $slide = $("<div>", { "class": "slide" })
        .append($("<div>", { "class": "image-box" }).append($img));
      $frag.append($slide);
    });

    $root.empty().append($frag);
    return this; // für chaining
  };
})(jQuery);

// Beim Laden ausführen
$(function () {
  $("#slideImages1").renderImagesSlides(images);
});

$(document).ready(function(){
    $('.image-slider1').slick({
    centerMode: true,
    slidesToShow: 1,                  // nur 1 Haupt-Slide sichtbar
    centerPadding: 'calc(var(--width)/4)',            
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