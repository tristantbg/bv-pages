import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GiaComponents from "./js/components/GiaComponents";
gsap.registerPlugin(ScrollTrigger);

const App = {
  sizeSet: (_) => {
    App.width = window.innerWidth || document.documentElement.clientWidth;
    App.height = window.innerHeight || document.documentElement.clientHeight;
    App.headerHeight = App.header.offsetHeight;
    App.isMobile = App.width <= 1024;
    App.isTouch = window.matchMedia("(pointer: coarse)").matches;
    App.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    App.setCSSVariables();
    App.lastWidth = App.width;
  },
  setCSSVariables: (_) => {
    App.container.style.setProperty("--viewport-height", App.height + "px");
    App.container.style.setProperty("--header-height", App.headerHeight + "px");
    if (!App.isMobile || (App.isMobile && App.lastWidth != App.width)) {
      App.container.style.setProperty(
        "--viewport-height-init",
        App.height + "px"
      );
    }
    App.container.classList.toggle("is-safari", App.isSafari);
  },
};

window.addEventListener("resize", App.sizeSet, false);

document.addEventListener("DOMContentLoaded", () => {
  App.header = document.querySelector("header");
  App.container = document.querySelector(".bv-page");
  App.join = App.container.querySelector(".join-us");
  App.sizeSet();

  GiaComponents.init();

  const slides = App.isMobile
    ? document.querySelectorAll(
        "section.section.fit-height:not(.fit-height-desktop), section[join-enable], section[join-disable]"
      )
    : document.querySelectorAll(
        "section.section.fit-height, section.section.fit-height-desktop"
      );
  slides.forEach((s, i) => {
    const scrollTriggerOptions = {
      id: "slide-" + i,
      trigger: s,
      start: "bottom bottom",
      scrub: true,
      pin: App.isMobile
        ? !s.hasAttribute("join-enable") && !s.hasAttribute("join-disable")
        : true,
      pinSpacing: false,
      onEnter: () => {
        if (s.hasAttribute("join-enable")) App.join.style.display = "block";
        if (s.hasAttribute("join-disable")) App.join.style.display = "none";
      },
      onEnterBack: () => {
        if (s.hasAttribute("join-enable")) App.join.style.display = "block";
        if (s.hasAttribute("join-disable")) App.join.style.display = "none";
      },
    };

    s.scrollTimeline = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: scrollTriggerOptions,
    });
  });

  ScrollTrigger.refresh();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
});
