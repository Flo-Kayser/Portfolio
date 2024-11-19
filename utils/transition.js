document.addEventListener('DOMContentLoaded', () => {
    const anchors = document.querySelectorAll('a');
    const transition_el = document.querySelector('.transition');
    const transition_text = document.querySelector('.transition-text');
  
    if (transition_el) {
      // Transition initial deaktivieren
      setTimeout(() => {
        transition_el.classList.remove('is-active');
      }, 500);
  
      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
  
        anchor.addEventListener('click', e => {
          e.preventDefault();
          const target = e.currentTarget.href;
  
          if (!target) {
            console.error('Kein Ziel für diesen Link gefunden!');
            return;
          }
  
          // Setze den Zieltext
          const targetName = e.currentTarget.getAttribute('data-title') || target;
          transition_text.textContent = `Navigating to: ${targetName}`;
          transition_text.classList.remove('is-hidden'); // Sicherstellen, dass der Text sichtbar ist
  
          // Transition starten
          transition_el.classList.add('is-active');
  
          // Text nach 1 Sekunde ausblenden
          setTimeout(() => {
            transition_text.classList.add('is-hidden');
          }, 1000); // Text verschwindet nach 1 Sekunde
  
          // Seite nach 2 Sekunden wechseln
          setTimeout(() => {
            window.location.href = target;
          }, 2000);
        });
      }
    } else {
      console.error("Element '.transition' nicht gefunden!");
    }
  });
  