/**
 * HeadScene
 * 
 * Orquestrador da seção "Head": conecta composição 2D, render do capacete
 * e efeitos de mouse, espelhando o fluxo observado no bundle para facilitar
 * manutenção e testes isolados.
 */
(function (global) {
  function HeadScene({ composition, helmet, mouse } = {}) {
    const state = {
      composition,
      helmet,
      mouse,
      reveal: 1,
      hover: 0,
      helmetHover: 0,
      filter: 0,
      time: 0,
    };

    return {
      init() {
        if (state.composition && typeof state.composition.init === 'function') {
          state.composition.init();
        }
        if (state.helmet && typeof state.helmet.init === 'function') {
          state.helmet.init();
        }
        if (state.mouse && typeof state.mouse.init === 'function') {
          state.mouse.init();
        }
        return this;
      },

      setInputs(inputs) {
        if (state.composition && typeof state.composition.setInputs === 'function') {
          state.composition.setInputs(inputs);
        }
        return this;
      },

      setReveal(value) {
        state.reveal = value;
        return this;
      },

      setFilter(value) {
        state.filter = value;
        return this;
      },

      setHelmetHover(value) {
        state.helmetHover = value;
        return this;
      },

      tick(dt = 0) {
        state.time += dt;
        if (state.composition && typeof state.composition.update === 'function') {
          state.composition.update({
            time: state.time,
            reveal: state.reveal,
            hover: state.hover,
            helmetHover: state.helmetHover,
            filter: state.filter,
          });
        }
        return this;
      },

      getOutputs() {
        const tHelmet =
          state.helmet && typeof state.helmet.renderToTexture === 'function'
            ? state.helmet.renderToTexture()
            : null;
        return { tHelmet };
      },

      getState() {
        return { ...state };
      },
    };
  }

  global.LandoHeadScene = HeadScene;
})(window);

