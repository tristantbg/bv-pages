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

class ProductsGrid extends HTMLElement {
  constructor() {
    super();
    this.GRID_LOADED_CLASS = "loaded";
    this.selectors = {
      title: ".c-product__name",
      price: ".c-price__value--current",
      image: ".c-productcarousel__slide:first-child img",
    };
    this.ids = this.dataset.ids.split(",");
    this.init();
  }
  fetchProductCardHTML(handle) {
    const productTileTemplateUrl = `${window.location.origin}/${
      window.location.pathname.split("/")[1]
    }/${handle}`;
    // console.log(productTileTemplateUrl);
    return fetch(productTileTemplateUrl)
      .then((res) => res.text())
      .then((res) => {
        const text = res;
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, "text/html");
        const title = htmlDocument.documentElement.querySelector(
          this.selectors.title
        );
        const price = htmlDocument.documentElement.querySelector(
          this.selectors.price
        );
        const image = htmlDocument.documentElement.querySelector(
          this.selectors.image
        );
        return `
          <div class="product-item">
            <div class="product-image">${image.outerHTML}</div>
            <div class="product-title">${title.innerText}</div>
            <div class="product-price">${price.innerText}</div>
          </div>
        `;
      })
      .catch((err) =>
        console.error(`Failed to load content for handle: ${handle}`, err)
      );
  }

  async setupGrid(grid) {
    if (this.ids.length) {
      const requests = this.ids.map(this.fetchProductCardHTML);
      const responses = await Promise.all(requests);
      const productCards = responses.join("");
      grid.innerHTML = productCards;
      grid.classList.add(this.GRID_LOADED_CLASS);
      grid.classList.add("grid");
    } else {
      grid.innerHTML = ``;
    }

    // const event = new CustomEvent("products:init-product-grid", {
    //   detail: { wishlist: wishlist },
    // });
    // document.dispatchEvent(event);
  }
  init() {
    this.setupGrid();
  }
}

customElements.define("products-grid", ProductsGrid);

const App = {
  sizeSet: () => {
    App.width = window.innerWidth || document.documentElement.clientWidth;
    App.height = window.innerHeight || document.documentElement.clientHeight;
    App.headerHeight = App.header.offsetHeight;
    App.isMobile = App.width <= 1024;
    App.isTouch = window.matchMedia("(pointer: coarse)").matches;
    App.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    App.setCSSVariables();
    App.lastWidth = App.width;
  },
  setCSSVariables: () => {
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
});
