import App from '../App.js'
import eventbus from 'gia/eventbus'

const Loader = {
  isLoaded: false,
  node: null,
  init: _ => {
    Loader.node = document.querySelector("#loader");
  },
  loading: _ => {

  },
  loaded: _ => {
    // if (Loader.node) Loader.node.style.display = 'none';
    if (Loader.node) Loader.node.remove();
    document.documentElement.classList.add('loaded')
  }
};

export default Loader;
