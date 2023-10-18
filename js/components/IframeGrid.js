class IframeGrid extends HTMLElement {
  constructor() {
    super();
    this.GRID_LOADED_CLASS = "loaded";
    this.url = this.dataset.url;
    this.init();
  }
  createMarkup() {
    this.innerHTML = `
      <div class="iframe-grid__container">
        <iframe
          src="${this.url}"
          class="iframe-grid__iframe"
          frameborder="0"
          width="100%"
          height="100%"
          marginheight="0"
          marginwidth="0"
          scrolling="no"
          allow="autoplay"
          target="_parent"
        ></iframe>
      </div>
    `;
  }
  init() {
    this.createMarkup();
  }
}

customElements.define("iframe-grid", IframeGrid);
