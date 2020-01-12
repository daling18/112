import Vue from 'vue';
import {
  on,
  off
} from 'src/utils/dom';

Vue.directive('resize', {
  bind(el, binding, vnode, oldVnode) {
    let resizeEle = document.createElement('object');
    let styles = {
      display: 'block',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      border: 'none',
      padding: '0px',
      margin: '0px',
      opacity: '0',
      'z-index': '-1000',
      'pointer-events': 'none',
    }
    el.style.cssText = 'position:relative;';
    resizeEle.style.cssText = Object.entries(styles).reduce((r, [p, v]) => {
      r += `${p}:${v};`
      return r;
    }, '');
    resizeEle.type = 'text/html';
    resizeEle.tabindex = -1;
    el.appendChild(resizeEle);
    el.resizeEle = resizeEle;
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    on(el.resizeEle.contentWindow, 'resize', binding.value);
  },
  unbind(el, binding, vnode, oldVnode) {
    off(el.resizeEle.contentWindow, 'resize', binding.value)
  }

})
