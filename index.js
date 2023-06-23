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
  App.sizeSet();

  GiaComponents.init();

  const slides = App.isMobile ? document.querySelectorAll("section.section.fit-height:not(.fit-height-desktop)") : document.querySelectorAll("section.section.fit-height, section.section.fit-height-desktop");
  slides.forEach((s, i) => {
    if (s.classList.contains("desktop-only") && App.isMobile) return;

    const scrollTriggerOptions = {
      id: "slide-" + i,
      trigger: s,
      start: "bottom bottom",
      scrub: true,
      pin: true,
      pinSpacing: false,
      // markers: true,
    };

    s.scrollTimeline = gsap.timeline({
      defaults: {
        duration: 2,
        // ease: "expo.out",
      },
      scrollTrigger: scrollTriggerOptions,
    });
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "[join-trigger]",
        start: "bottom bottom",
        // end: "max",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".join-us",
      {
        autoAlpha: 0,
        
      },
      { autoAlpha: 1, duration: 0 }
    );

  // const quotes = document.querySelectorAll("section.fit-height");
  // quotes.forEach((s, i) => {
  //   const scrollTriggerOptions = {
  //     id: "slide-" + i,
  //     trigger: s,
  //     start: "top top",
  //     end: "bottom top",
  //     scrub: true,
  //     pin: true,
  //     pinSpacing: false,
  //     // markers: true,
  //   };

  //   s.scrollTimeline = gsap.timeline({
  //     defaults: {
  //       duration: 3,
  //       // ease: "expo.out",
  //     },
  //     scrollTrigger: scrollTriggerOptions,
  //   }).to(s, {scaleY: 0, transformOrigin: 'top'});
  // });
  ScrollTrigger.refresh();
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
});
