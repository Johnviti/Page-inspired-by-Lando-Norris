/**
 * HeadComposition
 * 
 * Encapsula a composição 2D da seção "Head" (mistura do background,
 * diffuse, render do capacete e efeito de cursor), expondo uma API mínima
 * para integração com o runtime existente sem depender de imports.
 */
(function (global) {
  function HeadComposition() {
    const state = {
      inputs: {
        tDefaultDiffuse: null,
        tHelmet: null,
        tCursorEffect: null,
        tBackgroundNoise: null,
      },
      uniforms: {
        uTime: 0,
        uReveal: 1,
        uHover: 0,
        uHelmetHover: 0,
        uFilter: 0,
      },
      setUniforms: null,
      getUniforms: null,
    };

    return {
      init({ getUniforms, setUniforms } = {}) {
        state.getUniforms = typeof getUniforms === 'function' ? getUniforms : null;
        state.setUniforms = typeof setUniforms === 'function' ? setUniforms : null;
        return this;
      },

      setInputs({ defaultDiffuse, helmetRT, cursorRT, noiseRT } = {}) {
        state.inputs.tDefaultDiffuse = defaultDiffuse || null;
        state.inputs.tHelmet = helmetRT || null;
        state.inputs.tCursorEffect = cursorRT || null;
        state.inputs.tBackgroundNoise = noiseRT || null;

        if (state.setUniforms) {
          state.setUniforms({
            tDefaultDiffuse: state.inputs.tDefaultDiffuse,
            tHelmet: state.inputs.tHelmet,
            tCursorEffect: state.inputs.tCursorEffect,
            tBackgroundNoise: state.inputs.tBackgroundNoise,
          });
        }
        return this;
      },

      update({ time, reveal, hover, helmetHover, filter } = {}) {
        if (typeof time === 'number') state.uniforms.uTime = time;
        if (typeof reveal === 'number') state.uniforms.uReveal = reveal;
        if (typeof hover === 'number') state.uniforms.uHover = hover;
        if (typeof helmetHover === 'number') state.uniforms.uHelmetHover = helmetHover;
        if (typeof filter === 'number') state.uniforms.uFilter = filter;

        if (state.setUniforms) {
          state.setUniforms({
            uTime: state.uniforms.uTime,
            uReveal: state.uniforms.uReveal,
            uHover: state.uniforms.uHover,
            uHelmetHover: state.uniforms.uHelmetHover,
            uFilter: state.uniforms.uFilter,
          });
        }
        return this;
      },

      getState() {
        return {
          inputs: { ...state.inputs },
          uniforms: { ...state.uniforms },
        };
      },
    };
  }

  global.LandoHeadComposition = HeadComposition;
})(window);

