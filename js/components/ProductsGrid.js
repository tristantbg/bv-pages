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
    const that = this;
    const productTileTemplateUrl = `${window.location.origin}/${
      window.location.pathname.split("/")[1]
    }/${handle}.html`;
    // console.log(productTileTemplateUrl);
    return fetch(productTileTemplateUrl)
      .then((res) => res.text())
      .then((res) => {
        const text = res;
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(text, "text/html");
        const title = htmlDocument.documentElement.querySelector(
          that.selectors.title
        );
        const price = htmlDocument.documentElement.querySelector(
          that.selectors.price
        );
        const image = htmlDocument.documentElement.querySelector(
          that.selectors.image
        );
        return `
          <a href="${productTileTemplateUrl}" class="product-item">
            <div class="product-image">${image.outerHTML}</div>
            <div class="product-title">${title.innerText}</div>
            <div class="product-price">${price.innerText}</div>
          </a>
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
