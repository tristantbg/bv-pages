import LazySizes from "./components/Lazysizes";
import Loader from "./components/Loader";
import Links from "./components/Links";
// import GiaComponents from './components/GiaComponents';
// import PageLoader from './components/PageLoader';
// import eventbus from 'gia/eventbus';
import debounce from "lodash/debounce";
import shuffle from "lodash/shuffle";

const App = {
  init: (_) => {
    Loader.init();
    App.sizeSet();
    App.interact();
    // GiaComponents.init();
    // PageLoader.init();
    LazySizes.init();
    Loader.loaded();
    window.addEventListener("resize", App.sizeSet, false);
    setTimeout(App.sizeSet, 300);
  },
  sizeSet: (_) => {
    App.width = window.innerWidth || document.documentElement.clientWidth;
    App.height = window.innerHeight || document.documentElement.clientHeight;
    App.isMobile = App.width <= 767;
    App.isTouch = window.matchMedia("(pointer: coarse)").matches;
    App.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // eventbus.emit('App--resize')
    App.setCSSVariables();
    App.lastWidth = App.width;
  },
  setCSSVariables: (_) => {
    document.documentElement.style.setProperty(
      "--viewport-height",
      App.height + "px"
    );
    if (!App.isMobile || (App.isMobile && App.lastWidth != App.width)) {
      document.documentElement.style.setProperty(
        "--viewport-height-init",
        App.height + "px"
      );
    }
    // document.documentElement.classList.toggle('is-safari', App.isSafari)
  },
  addListener: (target, eventType, func = () => {}) => {
    const targets = document.querySelectorAll(
      '[event-target="' + target + '"]'
    );
    [...targets].forEach((elem) => {
      elem.addEventListener(eventType, func);
    });
  },
  interact: (_) => {
    Links.init();
  },
  shuffle(container) {
    if (container.hasChildNodes()) {
      const elements = [...container.querySelectorAll(":scope > *")];
      const shuffledElements = shuffle(elements);
      shuffledElements.forEach((e) => {
        container.append(e);
      });
    }
  },
};
export default App;
