/**
 * useBuiltIns: 'entry' 사용할 경우
 * import "core-js/stable";
 * import "regenerator-runtime/runtime";
 *
 */

/**
 * useBuiltIns: 'usage'와
 *  리액트를 사용할 경우, https://reactjs.org/docs/javascript-environment-requirements.html
 */
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
