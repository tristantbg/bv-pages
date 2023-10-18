import { gsap } from "gsap";

class ImageFlipper extends HTMLElement {
  constructor() {
    super();
    this.images = this.querySelectorAll("img");
    this.init();
  }
  init() {
    this.images[0].classList.add("active");
    this.tl = gsap.timeline({
      defaults: {
        duration: 2.5,
        ease: "expo.inOut",
      },
      // yoyo: true,
      repeat: -1,
    });
    const that = this;
    this.tl.fromTo(
      this.images[0],
      { rotateX: 0 },
      {
        rotateX: 180,
        force3D: true,
        onUpdate: function () {
          this.targets()[0].classList.toggle("active", this.progress() < 0.5);
        },
      }
    );
    this.tl.fromTo(
      this.images[1],
      { rotateX: -180 },
      {
        rotateX: 0,
        force3D: true,
        onUpdate: function () {
          this.targets()[0].classList.toggle("active", this.progress() > 0.5);
        },
      },
      "<"
    );
    this.tl.fromTo(
      this.images[1],
      { rotateX: 0 },
      {
        rotateX: 180,
        force3D: true,
        onUpdate: function () {
          this.targets()[0].classList.toggle("active", this.progress() < 0.5);
        },
      },
      "+=1"
    );
    this.tl.fromTo(
      this.images[0],
      { rotateX: -180 },
      {
        rotateX: 0,
        force3D: true,
        onUpdate: function () {
          this.targets()[0].classList.toggle("active", this.progress() > 0.5);
        },
      },
      "<"
    );
  }
}

customElements.define("image-flipper", ImageFlipper);
