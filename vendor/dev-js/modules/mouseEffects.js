/**
 * MouseEffects
 * 
 * Normaliza e suaviza (de forma simples) a posição do mouse em coordenadas
 * de dispositivo (-1..1), permitindo registrar listeners para reagir a hovers
 * e atualizar uniforms externos (cursores/efeitos).
 */
(function (global) {
  function MouseEffects({ target = document } = {}) {
    const state = {
      x: 0,
      y: 0,
      nx: 0,
      ny: 0,
      listeners: [],
    };

    function onMove(e) {
      const w = Math.max(1, global.innerWidth || 1);
      const h = Math.max(1, global.innerHeight || 1);
      state.x = e.clientX;
      state.y = e.clientY;
      state.nx = (state.x / w) * 2 - 1;
      state.ny = (state.y / h) * -2 + 1;
      state.listeners.forEach((fn) => {
        try {
          fn({ ...state });
        } catch (_) {}
      });
    }

    return {
      init() {
        target.addEventListener('mousemove', onMove);
        return this;
      },
      on(fn) {
        if (typeof fn === 'function') {
          state.listeners.push(fn);
          return () => {
            state.listeners = state.listeners.filter((f) => f !== fn);
          };
        }
        return () => {};
      },
      get() {
        return { ...state };
      },
      destroy() {
        target.removeEventListener('mousemove', onMove);
        state.listeners = [];
      },
    };
  }

  global.LandoMouseEffects = MouseEffects;
})(window);

