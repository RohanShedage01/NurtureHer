// Use per-accordion behavior: each .accordion is independent and items inside each
document.querySelectorAll('.accordion').forEach(accordion => {
  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const btn = item.querySelector('.toggle-btn');
    const content = item.querySelector('.accordion-content');

    // helper to close a single content
    function closeContent(iContent, iBtn){
      iContent.style.maxHeight = null;
      iContent.classList.remove('open');
      if (iBtn) iBtn.classList.remove('rotate');
      if (iBtn) iBtn.setAttribute('aria-expanded','false');
    }

    // helper to open a single content
    function openContent(iContent, iBtn){
      // set maxHeight equal to scrollHeight to animate slide-down
      iContent.style.maxHeight = iContent.scrollHeight + 'px';
      iContent.classList.add('open');
      if (iBtn) iBtn.classList.add('rotate');
      if (iBtn) iBtn.setAttribute('aria-expanded','true');
    }

    header.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');

      // close other items inside the same accordion block
      items.forEach(it => {
        const c = it.querySelector('.accordion-content');
        const b = it.querySelector('.toggle-btn');
        if (c !== content) closeContent(c,b);
      });

      // toggle current
      if (isOpen) closeContent(content, btn);
      else openContent(content, btn);
    });

    // keyboard support: Enter or Space toggles
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });

    // ensure content is collapsed on load (in case of CSS cached heights)
    closeContent(content, btn);
  });
});
