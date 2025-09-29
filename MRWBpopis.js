// MRWBpopis.js – minimalistická verze bez „stormu“ událostí
(async () => {
  // počkej, až je základní UI z MRWB.html opravdu v DOM (vkládá se přes document.write)
  const waitFor = (sel, t = 5000) => new Promise((res, rej) => {
    const t0 = performance.now();
    (function tick() {
      const el = document.querySelector(sel);
      if (el) return res(el);
      if (performance.now() - t > t) return rej(new Error(`timeout waiting for ${sel}`));
      requestAnimationFrame(tick);
    })();
  });
  try { await waitFor('#FDGPET', 6000); } catch {}

  // načti původní CT skript
  const resp = await fetch('CTWBpopis.js', { cache: 'no-cache' });
  const text = await resp.text();

  // prostá náhrada všech řetězců CT -> MR (i uprostřed slov)
  const transformed = text.replace(/CT/g, 'MR');

  // ochrana proti </script>
  const safe = transformed.replace(/<\/script>/gi, '<\\/script>');

  // injektuj a spusť
  const s = document.createElement('script');
  s.textContent = safe + '\n//# sourceURL=MRWBpopis_transformed.js';
  document.head.appendChild(s);

  // nechej registrace doběhnout
  await Promise.resolve();
  await new Promise(r => requestAnimationFrame(r));

  // inicializace
  try { if (typeof window.updateTexts === 'function') window.updateTexts(); } catch {}

  // jemné „probuzení“ jen na klíčových prvcích — vyhne se cyklům
  const fire = (id, type) => {
    const el = document.getElementById(id);
    if (el) el.dispatchEvent(new Event(type, { bubbles: true }));
  };
  fire('SUVLiver', 'input');
  fire('SUVParotid', 'input');
  fire('DateCompare', 'change');
})();
