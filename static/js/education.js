(function ($) {
  $.fn.renderImageSlides = function (items) {
    const $root = this;
    const $frag = $(document.createDocumentFragment());

    items.forEach((it) => {
      const $img = $("<img>", {
        src: it,
        alt: "Logo",
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


let nacht_die_wissen_schafft =[
    "wissennacht1.webp",
    "wissennacht2.webp",
    "wissennacht3.webp",
    "wissennacht4.webp",
    "wissennacht5.webp",
]
let card_game_hsg = [
    "cardgame1.webp",
    "cardgame2.webp"
]
let education_through_social_media = [
    "chlamyshadow1.webp",
    "chlamyshadow2.webp",
    "chlamyshadow3.webp",
    "chlamyshadow4.webp",
    "chlamyshadow5.webp",
    "e-coli1.webp",
    "e-coli2.webp",
    "e-coli3.webp",
    "e-coli4.webp",
    "e-coli5.webp",
    "e-coli6.webp",
    "genetik1.webp",
    "enzym1.webp",   
]
let participation_in_scientific_and_industry_events = [
    "industry1.webp",
    "industry2.webp",
    "industry3.webp",
    "industry4.webp",
    "industry5.webp",
]
let mint4u = [
    "group-pic-mint4you2.webp",
]
let mi_n_tmachwelt = [
    "mintmachwelt1.webp",
    "mintmachwelt2.webp",
    "mintmachwelt3.webp",
    "mintmachwelt4.webp",
    "mintmachwelt5.webp",
]
let islamabad = [
    "pic1-1.webp",
    "pic2-1.webp",
]
let features_in_newspapers_and_magazines = [
    "magazine1.webp",
    "magazine2.webp"
]
let personal_insights_in_the_rptu = [
    "rptu-story-1-1.webp",
    "rptu-story-2-1.webp",
    "rptu-story-3-1.webp"
]
let school_visits = [
    "school1.webp",
    "school2.webp",
    "school3.webp",
    "school4.webp",
    "school5.webp",
]
let self_education = [
    "selfeducation1.webp",
    "selfeducation2.webp",
    "selfeducation3.webp",
    "selfeducation4.webp",
    "selfeducation5.webp",
    "summer-school-certificate2.webp"
]
let waffle_sale = [
    "waffle1.webp",
    "waffle2.webp",
    "waffle3.webp",
]

const sections = [
  { id: "#nacht_die_wissen_schafft", files: nacht_die_wissen_schafft, suffix: "nacht-die-wissen-schafft/" },
  { id: "#education_through_social_media", files: education_through_social_media, suffix: "education-through-social-media/" },
  { id: "#participation_in_scientific_and_industry_events", files: participation_in_scientific_and_industry_events, suffix: "participation-in-scientific-and-industry-events/" },
  { id: "#mint4u", files: mint4u, suffix: "mint4u/" },
  { id: "#mi_n_tmachwelt", files: mi_n_tmachwelt, suffix: "mi-n-tmachwelt/" },
  { id: "#islamabad", files: islamabad, suffix: "islamabad/" }, // <- Whitespace entfernt!
  { id: "#features_in_newspapers_and_magazines", files: features_in_newspapers_and_magazines, suffix: "features-in-newspapers-and-magazines/" },
  { id: "#card_game_hsg", files: card_game_hsg, suffix: "card-game-hsg/" },
  { id: "#personal-insights-in-the-rptu", files: personal_insights_in_the_rptu, suffix: "	personal-insights-in-the-rptu/" },
  { id: "#school-visits", files: school_visits, suffix: "school-visits/" },
  { id: "#self-education", files: self_education, suffix: "self-education/" },
  { id: "#waffle-sale", files: waffle_sale, suffix: "waffle-sale/" },

];


lists = sections.map(({ files, suffix }) =>
  files.map(file => resolveSrc_Static(file, `education/${suffix}`))
);


// Beim Laden ausführen
$(function () {
  sections.forEach(({ id }, i) => {
    const slideList = lists[i];           // die verarbeitete Liste an gleicher Position
    if ($(id).length && slideList?.length) {
      $(id).renderImageSlides(slideList);
    }
  });
});



for (let i = 1; i <= 11; i++) {
    let sliderclass = '.edu-image-slider' + i
    $(document).ready(function () {
        $(sliderclass).slick({
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
                { breakpoint: 992, settings: { centerPadding: '14vw' } },
                { breakpoint: 768, settings: { centerPadding: '20vw', arrows: false } },
                { breakpoint: 560, settings: { centerPadding: '12vw', arrows: false } }
            ],
            nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-next" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>',
            prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-prev" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>',

        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('karten');
    const backSrc = "https://static.igem.wiki/teams/5758/education/card-game-hsg/cardback/r-ckseitenohnehintergrund.webp";

    let html = "";
    for (let i = 1; i <= 33; i++) {
      html += `
        <div class="cardContainer">
          <div class="card">
            <div class="cardFront">
              <img src="https://static.igem.wiki/teams/5758/education/card-game-hsg/cardfront/${i}.webp">
            </div>
            <div class="cardBack">
              <img src="${backSrc}">
            </div>
          </div>
        </div>
      `;
    }
    container.innerHTML = html;
  });