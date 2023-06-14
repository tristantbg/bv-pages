import App from '../../App';
import Component from 'gia/Component'
import eventbus from 'gia/eventbus'
import debounce from 'lodash/debounce'
import Draggable from '../../vendor/Draggable'
import InertiaPlugin from '../../vendor/InertiaPlugin'
import gsap from 'gsap'
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);
export default class Ticker extends Component {
    constructor(element) {
        super(element);
        this.ref = {
            content: null,
            inner: null,
        }
        this.options = {

        }
        this.wrap = gsap.utils.wrap(0, 1);
    }
    mount() {
        this.initTicker()
        eventbus.on('App--resize', this.resize.bind(this))
    }
    resize() {
      this.contentWidth = this.ref.inner.offsetWidth / this.cloneFactor
      // this.ref.inner.style.setProperty('--ticker-width', this.contentWidth*2 + 'px')

      if(this.animation) this.animation.play(0);

      this.animation = gsap.to(this.ref.inner, {
        duration: 100,
        x: -this.contentWidth,
        ease: "none",
        repeat: -1,
        overwrite: true
      });
    }
    initTicker() {
        const that = this
        // Calculate Factor
        this.ref.content.style.display = 'block'
        let contentText = this.ref.content.innerHTML
        let wrapperWidth = this.element.offsetWidth
        let initialContentWidth = this.ref.content.offsetWidth
        this.cloneFactor = Math.ceil(wrapperWidth / initialContentWidth) + 1
        // Create Elements
        this.ref.inner.innerHTML = ''
        for (let i = 0; i < this.cloneFactor; i++) {
            let newDiv = document.createElement("div")
            newDiv.innerHTML = contentText
            newDiv.classList.add('ticker--element');
            this.ref.inner.appendChild(newDiv)
        }
        this.ref.content.style.display = 'none'
        this.resize()
        // Create drag
        this.draggable = new Draggable(this.ref.inner, {
          type: "x",
          trigger: this.ref.inner,
          throwProps: true,
          onPressInit: function() {
            that.animation.pause();
            that.startPos = this.x;
          },
          onDrag: function() {
            let prog = that.wrap(-this.x / that.contentWidth);
            that.animation.progress(prog);
          },
          onThrowUpdate: function() {
            let prog = that.wrap(-this.x / that.contentWidth);
            that.animation.progress(prog);
          },
          onThrowComplete: function() {
            that.animation.play();
            gsap.fromTo(that.animation, {timeScale:0}, {duration: 1, timeScale:1, ease:"power1.in"});
          },
        })
        this.element.classList.add('show')
    }
}
