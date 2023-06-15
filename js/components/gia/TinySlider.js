import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Component from "gia/Component";
import eventbus from "gia/eventbus";
gsap.registerPlugin(ScrollTrigger);

export default class TinySlider extends Component {
  constructor(element) {
    super(element);
    this.ref = {
      slideNumber: null,
    };
    this.options = {
      autoplay: 2000,
    };
    this.counter = 0;
    this.paused = false;
  }
  mount() {
    this.slides = [
      ...this.element.querySelectorAll(
        ":scope > *:not([g-ref=slideNumber]):not(.arrow)"
      ),
    ];
    if (this.slides.length) {
      this.activeSlide = this.element.querySelector(":scope > .active");
      if (!this.activeSlide) {
        this.activeSlide = this.slides[0];
        this.activeSlide.classList.add("active");
      }
    }
    if (this.slides.length < 2) return;
    this.slideNumber = this.element.parentNode.querySelector(
      ".buttons .slide-number"
    );
    this.events();
    this.slidesCount = this.slides.length.toString().padStart(2, "0");
    eventbus.on("Slider--play", this.play.bind(this));
    ScrollTrigger.create({
      trigger: this.element,
      start: "top center",
      onToggle: ({ isActive }) => {
        if (isActive) this.play();
        else this.pause();
      },
    });
  }
  unmount() {
    window.clearInterval(this.autoplayInterval);
  }
  events() {
    if (!this.options.autoplay)
      this.element.addEventListener("click", this.next.bind(this));
  }
  play() {
    if (this.options.autoplay)
      this.autoplayInterval = setInterval(
        this.next.bind(this),
        this.options.autoplay
      );
  }
  pause() {
    clearInterval(this.autoplayInterval);
  }
  updateNumber() {
    if (this.ref.slideNumber)
      this.ref.slideNumber.innerHTML = `<div class="button-title">${(
        this.slides.indexOf(this.activeSlide) + 1
      )
        .toString()
        .padStart(2, "0")}/${this.slidesCount}</div>`;
    // this.slideNumber.innerHTML = `${(this.slides.indexOf(this.activeSlide) + 1).toString().padStart(2, '0')}/${this.slidesCount}`
  }
  next() {
    if (this.paused) return;
    this.counter++;
    this.activeSlide.classList.remove("active");
    this.activeSlide =
      this.slides[
        (this.slides.indexOf(this.activeSlide) + 1) % this.slides.length
      ];
    this.activeSlide.classList.add("active");
    this.updateNumber();
  }
}
