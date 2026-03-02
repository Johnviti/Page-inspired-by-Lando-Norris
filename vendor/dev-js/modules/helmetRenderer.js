/**
 * HelmetRenderer
 * 
 * Encapsula o render 3D do capacete, delegando a criação do objeto real
 * para uma função de fábrica injetada (compatível com a classe usada no bundle).
 * Expõe API para trocar variantes e recuperar a textura de saída (render target).
 */
(function (global) {
  function HelmetRenderer({ createHelmetInstance } = {}) {
    const state = {
      instance: null,
      renderTarget: null,
      variant: 'Lime',
    };

    return {
      init() {
        if (typeof createHelmetInstance === 'function') {
          const helmet = createHelmetInstance();
          state.instance = helmet && helmet.instance ? helmet.instance : helmet || null;
          state.renderTarget =
            (helmet && (helmet.renderTarget || helmet.target)) || null;
        }
        return this;
      },

      setVariant(name) {
        state.variant = name;
        if (state.instance && typeof state.instance.setVariant === 'function') {
          state.instance.setVariant(name);
        }
        return this;
      },

      renderToTexture() {
        if (state.instance && state.instance.renderTarget) {
          return state.instance.renderTarget.texture;
        }
        return state.renderTarget ? state.renderTarget.texture : null;
      },

      getState() {
        return {
          variant: state.variant,
          hasInstance: !!state.instance,
          hasRenderTarget: !!state.renderTarget || !!(state.instance && state.instance.renderTarget),
        };
      },
    };
  }

  global.LandoHelmetRenderer = HelmetRenderer;
})(window);

