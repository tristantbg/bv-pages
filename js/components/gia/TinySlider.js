import App from '../../App';
import Component from 'gia/Component';
import eventbus from 'gia/eventbus'
import sample from 'lodash/sample'

export default class TinySlider extends Component {
  constructor(element) {
    super(element);
    this.ref = {
      slideNumber: null
    }
    this.options = {
      autoplay: 180,
      positions: ['left', 'left', 'left2', 'right2', 'center']
    }
    this.lastPosition = 'center'
    this.counter = 0
    this.paused = false
  }
  mount() {
    App.shuffle(this.element)
    this.slides = [...this.element.querySelectorAll(':scope > *:not([g-ref=slideNumber]):not(.arrow)')]
    if (this.slides.length) {
      this.activeSlide = this.element.querySelector(':scope > .active')
      if (!this.activeSlide) {
        this.activeSlide = this.slides[0]
        this.activeSlide.classList.add('active')
      }
    }
    if (this.slides.length < 2) return
    this.slideNumber = this.element.parentNode.querySelector('.buttons .slide-number')
    this.events()
    this.slidesCount = this.slides.length.toString().padStart(2, '0')
    // this.updateNumber()
    // if (this.activeSlide.querySelector('img')) {
    //   this.activeSlide.querySelector('img').addEventListener('load', e => {
    //     if (this.loaded) return
    //     this.element.classList.add('loaded')
    //     if (this.options.autoplay) this.autoplayInterval = setInterval(this.next.bind(this), this.options.autoplay)
    //     this.loaded = true
    //   })
    // }
    // if (this.activeSlide.querySelector('video')) {
    //   this.element.classList.add('loaded')
    //   this.loaded = true
    // }
    this.videos = this.element.querySelectorAll('video')
    this.videos.forEach(v => v.addEventListener('ended', this.onEnded.bind(this)))
    eventbus.on('Slider--play', this.play.bind(this))
  }
  unmount() {
    window.clearInterval(this.autoplayInterval)
  }
  events() {
    if (!this.options.autoplay) this.element.addEventListener('click', this.next.bind(this))
  }
  play() {
    if (this.options.autoplay) this.autoplayInterval = setInterval(this.next.bind(this), this.options.autoplay)
  }
  updateNumber() {
    if (this.ref.slideNumber) this.ref.slideNumber.innerHTML = `<div class="button-title">${(this.slides.indexOf(this.activeSlide) + 1).toString().padStart(2, '0')}/${this.slidesCount}</div>`
    // this.slideNumber.innerHTML = `${(this.slides.indexOf(this.activeSlide) + 1).toString().padStart(2, '0')}/${this.slidesCount}`
  }
  next() {
    if (this.paused) return
    this.counter++
    this.activeSlide.classList.remove('active')
    this.activeSlide = this.slides[(this.slides.indexOf(this.activeSlide) + 1) % this.slides.length]
    // this.lastPosition = sample(this.options.positions.filter(p => p !== this.lastPosition))
    // this.activeSlide.dataset.position = this.lastPosition
    this.currentVideo = this.activeSlide.querySelector('video')
    if (this.currentVideo) {
      this.paused = true
      this.currentVideo.currentTime = 0
      this.currentVideo.play()
      window.clearInterval(this.autoplayInterval)
    }
    this.activeSlide.classList.add('active')
    this.updateNumber()
    if (this.counter === 5) {
      App.switchColor()
      this.counter = 0
    }
  }
  onEnded(e) {
    if (this.currentVideo && this.currentVideo.isSameNode(e.currentTarget)) {
      this.paused = false
      this.next()
      this.play()
    }
  }
}
