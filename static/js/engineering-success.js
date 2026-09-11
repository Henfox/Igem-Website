


let ticking = false;
const size = 100 / 15;

const ScrollPort = document.getElementById("ContentWrapper");
const Kreis = document.getElementById("Kreis");

const SECTIONS = [
    { id: "Design", start: 1, end: 3, items: ["D1", "D2", "D3"] },
    { id: "Build", start: 4, end: 10, items: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"] },
    { id: "Test", start: 11, end: 12, items: ["T1", "T2"] },
    { id: "Learn", start: 13, end: 15, items: ["L1", "L2", "L3"] },
];

const CIRCLE_MAP = { Design: 1, Build: 2, Test: 3, Learn: 4 };

let _lastSectionId = null;

// Helper zum Anzeigen/Verstecken
function show(el, on) {
    if (!el) return;
    el.style.display = on ? "" : "none";
}


// Helfer: aktiven Kreis setzen (1..4)
function setActiveCircle(num) {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`Kreis${i}`);
        if (!el) continue;
        el.classList.remove("aktiv");
        el.classList.add("aus");
    }
    const wel = document.getElementById(`Kreis${num}`);
    if (wel) {
        wel.classList.remove("aus");
        wel.classList.add("aktiv");
    }
}




function animation(progress) {
    const PARTS = 15;
    const p = Math.max(0, Math.min(1, Number(progress) || 0));
    const part = Math.min(PARTS, Math.floor(p * PARTS) + 1);

    // Alles ausblenden
    for (const sec of SECTIONS) {
        show(document.getElementById(sec.id), false);
        for (const itemId of sec.items) {
            show(document.getElementById(itemId), false);
        }

    }
    // Aktiven Abschnitt bestimmen
    const active = SECTIONS.find(s => part >= s.start && part <= s.end);
    if (!active) return part;

    if (_lastSectionId !== active.id) {
        setActiveCircle(CIRCLE_MAP[active.id]); // 1..4
        _lastSectionId = active.id;
    }

    // Abschnitt einblenden
    const sectionEl = document.getElementById(active.id);
    show(sectionEl, true);

    // Index des Items innerhalb des Abschnitts (0-basiert)
    const idxInSection = part - active.start;
    const activeItemId = active.items[idxInSection];

    // Nur das aktuelle Item einblenden
    const activeItemEl = document.getElementById(activeItemId);
    show(activeItemEl, true);


    // progress: 0..1  →  angle: 0..360 (stetig, ohne Sprünge)
    function getAngle(progress) {
        const p = Math.min(Math.max(progress, 0), 1); // clamp

        // Schritte pro Viertel: [3, 7, 2, 3]  → Anteile
        const q1 = 3 / 15, q2 = 7 / 15, q3 = 2 / 15, q4 = 3 / 15; // = 0.2, 0.4666.., 0.1333.., 0.2
        const b1 = q1;           // 0.2
        const b2 = q1 + q2;      // 0.6666666667
        const b3 = q1 + q2 + q3; // 0.8

        if (p <= b1) {
            // 0° → 90° über Anteil q1
            const t = p / q1;
            return 0 + t * 90;
        } else if (p <= b2) {
            // 90° → 180° über Anteil q2
            const t = (p - b1) / q2;
            return 90 + t * 90;
        } else if (p <= b3) {
            // 180° → 270° über Anteil q3
            const t = (p - b2) / q3;
            return 180 + t * 90;
        } else {
            // 270° → 360° über Anteil q4
            const t = (p - b3) / q4;
            return 270 + t * 90;
        }
    }
    Kreis.style.rotate = (-135 + -getAngle(progress)) + "deg";


}

function onScroll() {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
            computeProgress(ScrollPort, animation);
            ticking = false;
        });
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
document.addEventListener('DOMContentLoaded', onScroll);