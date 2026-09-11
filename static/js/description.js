(() => {
    const FIGURE_ID = 'clamy';
    const TEXT_WRAPPER_ID = 'clamyText';

    // Mapping SVG-IDs auf die Paragraph-IDs
    const MAP = {
        Pyrenoid: 'PyrenoidText',
        Plastoglobule: 'PlastoglobuleText',
        Mitichondrion: 'MitochondrionText',     // SVG hat Tippfehler "Mitichondrion"
        Plasma_membrane: 'Plasma-membraneText',
        Nucleus: 'NucleusText',
        Glogi_body: 'Golgi-bodyText',           // SVG-ID "Glogi_body" vs. Text "Golgi-bodyText"
        Eyespot: 'EyespotText',
        Cell_wall: 'Cell-wall',                 // hier heißt der <p>-ID "Cell-wall" (ohne "Text")
        Contractile_vacuole: 'ContractileText',
        Cilium: 'CiliumText',
        Chloroplast: 'ChloroplastText',
        // Hinweis: Es gibt auch "ChloroplastText" im HTML, aber kein passendes SVG mit id="Chloroplast"
    };

    const fig = document.getElementById(FIGURE_ID);
    const textWrap = document.getElementById(TEXT_WRAPPER_ID);
    if (!fig || !textWrap) return;

    // Alle Paragraphen referenzieren
    const paragraphs = Array.from(textWrap.querySelectorAll('p[id]'));

    function showParagraph(targetId) {
        paragraphs.forEach(p => {
            const match = p.id === targetId;
            p.hidden = !match;
            p.setAttribute('aria-hidden', String(!match));
        });
    }

    function setActiveSvg(svg) {
        fig.querySelectorAll('svg.is-active').forEach(s => s.classList.remove('is-active'));
        if (svg) svg.classList.add('is-active');
    }

    function activateBySvg(svg) {
        if (!svg || !svg.id) return;
        const paraId = MAP[svg.id];
        if (!paraId) return; // kein zugeordneter Text
        showParagraph(paraId);
        setActiveSvg(svg);
    }

    // Delegiertes Klicken im Figure
    fig.addEventListener('click', (e) => {
        const svg = e.target.closest('svg[id]');
        if (!svg) return;
        activateBySvg(svg);
    });

    // Keyboard: Fokusierbar + Enter/Space aktivieren
    fig.querySelectorAll('svg[id]').forEach(svg => {
        svg.setAttribute('tabindex', '0');
        svg.setAttribute('role', 'button');
        svg.setAttribute('aria-label', svg.id.replace(/[_-]/g, ' '));
    });

    fig.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const svg = e.target.closest('svg[id]');
        if (!svg) return;
        e.preventDefault();
        activateBySvg(svg);
    });
    activateBySvg(document.getElementById('Plasma_membrane'))
})();