/* eslint-disable */
import { gsap } from 'gsap'
import Util from '../util/util';

export default class ScrollCtrl {
  constructor(options) {
    this.page = options.page;
    this.hideCursor = options.hideCursor;
    this.sections = [];
    this.sliders = [];
    
    this.tween = null;
    this.scrollingElement = document.getElementById('main');
    this.isFirefox = Util.testBrowser('firefox');
    this.isIE = Util.testBrowser('ie');
    this.m = this.isIE ? 0.12 : 0.09;
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
    this.isMobile = this.winW <= 1024;
    this.pointer = options.pointer;
    this.pausePointer = false;
    this.sectionsL = this.sections.length;
    this.paralax = options.paralax;
    this.max = document.body.scrollHeight;
    this.maxVirtual = 0;
    this.maxDelta = 80;
    this.touch = { prev: {x: 0, y: 0}, start: {x: 0, y: 0} };
    this.target = 0;
    this.event = {};
    this.pause = false;
    this.data = { t: 0, c: 0 };
    this.stickyInertia = 0.05;
    this.onlyVirtual = false;
    this.delta = 0;
    this.pauseEvents = false;
    this.render = this.render.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.clickStart = this.clickStart.bind(this);
    this.clickUp = this.clickUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.onMove = this.onMove.bind(this);
    this.eventsManager = this.eventsManager.bind(this);
    this.resize = this.resize.bind(this);
    this.init();
  }
  init() {
    this.updateSections();
    
    document.addEventListener('touchstart', this.touchStart, { passive: false });
    document.addEventListener('touchmove', this.onMove, { passive: false });
    document.addEventListener('mouseup', this.clickUp);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseWheel', this.onMove, { passive: false });
    document.addEventListener('wheel', this.onMove);
    document.addEventListener('keydown', this.onMove);
    
    this.resize();
    this.updateElements(0);
    window.addEventListener('resize', () => {
      clearTimeout(this.resizedFinished);
      this.resizedFinished = setTimeout(() => {
        this.resize();
      }, 250);
    });
    this.render();
  }
  handleScroll() {
    var max = this.page.scrollHeight - this.winH;
    var pos = this.scrollingElement.scrollTop;
    if (this.paralax) {
      this.paralax.forEach(p => p(pos));
    }
  }
  goTo(id, delay) {
    const isNumber = !window.isNaN(id);
    const section = Util.isElement(id) || isNumber ? id : document.querySelector(id);
    if (section || isNumber) {
      const pos = isNumber ? id : section.offsetTop + section.offsetParent.offsetTop;
      this.tween = gsap.to(this.scrollingElement, {
        duration: 2,
        scrollTop: pos,
        delay: delay ? delay : 0,
        overwrite: 'false',
        ease: 'Power2.easeInOut',
        onComplete: () => {
          this.handleScroll();
        }
      });
    }
  }
  updateSections(sections) {
    this.sliders = Array.from(document.querySelectorAll('.horizontal-slider'));
    this.sections = sections ? sections : Array.from(document.querySelectorAll('[data-scroll-section]')).map(s => {
      return { $el: s };
    });
    this.sectionsL = this.sections.length;
    for (var i = 0; i < this.sectionsL; i++) {
      var s = this.sections[i];
      if (s.$el == undefined)
      s.$el = document.querySelector(s.selector);
      // if(i > 0) s.$el.style.visibility = 'hidden';
      s.$el.classList.add('section');
      s.rect = {};
      s.out = true;
      const isSticky = s.$el.getAttribute('data-scroll-sticky') === 'true'
      if(isSticky) {
        s.sticky = true
        s.stickyPlaceholder = s.$el.querySelector('[data-scroll-sticky-placeholder]')
        s.stickyContent = s.$el.querySelector('[data-scroll-sticky-content]')
      }
    }
    this.resize();
    if (this.paralax) {
      this.paralax.forEach(p => p(this.data.c, this.max));
    }
  }
  touchStart(e) {
    this.touch.start.slider = e.target.closest('.horizontal-slider');
    this.touch.prev.y = this.target;
    this.touch.prev.x = this.target;
    this.touch.start.y = e.targetTouches[0].pageY;
    this.touch.start.x = e.targetTouches[0].pageX;
  }
  clickStart(e){
    this.clickdown = true;
    this.touch.prev.y = this.target;
    this.touch.prev.x = this.target;
    this.touch.start.y = e.clientY;
    this.touch.start.x = e.clientX;
  }
  clickUp(e){
    this.clickdown = false;
  }
  onMove(e) {
    this.event = e;
    this.prevent(e);
    if (!this.pauseEvents && !this.pause) {
      requestAnimationFrame(this.eventsManager);
      this.pauseEvents = true;
    }
  }
  prevent(t) {
    if (!this.pause && t.cancelable && t.type !== 'keydown' && t.type !== 'touchmove')
    t.preventDefault();
  }
  eventsManager() {
    var t = this.event.type;
    switch (t) {
      case "wheel":
      this.wheel()
      break;
      case "mousemove":
      this.mouseMove()
      break;
      case "mousewheel":
      this.mouseWheel()
      break;
      case "touchmove":
      this.touchMove()
      break;
      case "keydown":
      this.keyDown()
      break;
      default:
      break;
    }
  }
  touchMove() {
    if (this.tween) this.tween.kill();
    var t = this.event.targetTouches[0].pageY - this.touch.start.y;
    const x = Math.abs(this.event.targetTouches[0].pageX - this.touch.start.x);
    const someSlider = this.sliders.some(slider => Util.isInViewportDom(slider));
    if(x > Math.abs(t) && someSlider && this.touch.start.slider) {
      t = 0;
    }
    this.delta = 2.9 * t;
    this.target = this.delta + this.touch.prev.y;
    this.update();
  }
  mouseMove(){
    this.pauseEvents = false;
    this.pausePointer = true;
    this.pointer.style.pointerEvents = 'none';
  }
  mouseWheel() {
    this.pausePointer = false;
    var t = this.event.wheelDeltaY ? this.event.wheelDeltaY : this.event.wheelDelta;
    if(this.onlyVirtual){
      if(t < 0)
      t = -Math.min(Math.abs(t * 0.7), Math.abs(this.maxDelta * 0.4));
      else
      t = Math.min(Math.abs(t * 0.7), Math.abs(this.maxDelta * 0.4));
    }
    this.delta = t;
    this.target += this.delta;
    this.update();
  }
  wheel() {
    this.pausePointer = false;
    const x = Math.abs(this.event.deltaX);
    var t = this.event.wheelDeltaY || -1 * this.event.deltaY;
    if (this.isFirefox && this.event.deltaMode)
    t *= 60;
    if(this.isIE)
    t *= 2;
    t *= .554;
    const someSlider = this.sliders.some(slider => Util.isInViewportDom(slider));
    if(x > 10 && someSlider) t = 0;
    if(this.onlyVirtual){
      if(t < 0)
      t = -Math.min(Math.abs(t * 0.7), Math.abs(this.maxDelta * 0.4));
      else
      t = Math.min(Math.abs(t * 0.7), Math.abs(this.maxDelta * 0.4));
    }
    this.delta = t;
    this.target += this.delta;
    this.update()
  }
  keyDown() {
    var t, kc = this.event.keyCode;
    if (kc === 38)
    t = 80;
    else if (40 === kc)
    t = -80
    else if (32 === kc && this.event.shiftKey)
    t = this.spaceDelta
    else if (32 === kc)
    t = -this.spaceDelta;
    else
    t = 0;
    this.delta = t;
    this.target += this.delta;
    this.update();
  }
  scrollTo(t) {
    this.target = Util.round(Math.max(Math.min(-t, 0), -this.max));
    this.update();
  }
  update() {
    if(this.onlyVirtual)
    this.target = this.maxVirtual === 0 ? Util.round(Math.min(this.target, 0)) : Util.round(Math.max(Math.min(this.target, 0), -this.maxVirtual));
    else
    this.target = Util.round(Math.max(Math.min(this.target, 0), -this.max));
    this.scroll(-this.target);
    this.pauseEvents = false;
  }
  scroll(t) {
    this.data.t = Util.round(t);
  }
  getMax() {
    var offset = this.page.offsetHeight;
    var ih = window.innerHeight;
    this.max = Math.max(offset - ih, 0);
    this.data.t = Util.round(Math.min(this.data.t, this.max));
    this.data.c = this.data.t;
  }
  render() {
    this.data.c += this.m * (this.data.t - this.data.c);
    var final = Util.round(this.data.c);
    if (final !== this.data.t) {
      this.updateElements(final);
      if(!this.pausePointer){
        this.pausePointer = true;
        if(!this.isMobile) {
          this.pointer.style.pointerEvents = 'all';
          if(this.hideCursor) this.hideCursor()
        }
      }
    } else {
      this.pausePointer = true;
      this.pointer.style.pointerEvents = 'none';
    }
    requestAnimationFrame(this.render);
  }
  addParalax(fun) {
    if (this.paralax.indexOf(fun) === -1)
    this.paralax.push(fun);
  }
  removeParalax(fun) {
    this.paralax.splice(this.paralax.indexOf(fun), 1);
  }
  updateElements(target) {
    if (this.paralax) {
      this.paralax.forEach(p => p(target, this.max));
    }
    if(this.onlyVirtual) return;
    for (var i = 0; i < this.sectionsL; ++i) {
      var section = this.sections[i];
      if(section.sticky){
        if(target > section.rect.top + this.winH && target < section.rect.top + section.stickyHeight) {
          section.$el.setAttribute('data-scroll-fixed', true);
          this.translate(section.stickyContent, -(target - section.rect.top - this.winH), i);
        }else {
          section.$el.removeAttribute('data-scroll-fixed');
          if(target < section.rect.top + section.stickyHeight)
            this.translate(section.stickyContent, 0, i);
          else
            this.translate(section.stickyContent, -(section.stickyHeight - this.winH), i);
        }
      }
      if(target >= section.rect.top && target <= section.rect.bottom){
        section.out = false;
        section.$el.style.visibility = 'visible';
        this.translate(section.$el, target, i);
      }else if(!section.out){
        section.out = true;
        this.translate(section.$el, target, i);
        section.$el.style.visibility = 'hidden';
      }
    }
  }
  translate($el, target, i) {
    const gap = i === this.sectionsL - 1 || $el.getAttribute('data-scroll-fixed') ? 0 : -1.5 * i;
    $el.style.transform = `translate3d(0px, ${-target + gap}px, 0px)`;
  }
  resize() {
    this.getMax();
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
    this.isMobile = this.winW <= 1024;
    for (var i = 0; i < this.sectionsL; ++i) {
      var section = this.sections[i];
      this.translate(section.$el, this.data.t, i);
      if(section.sticky) {
        section.stickyPlaceholder.style.height = `${section.stickyContent.scrollHeight}px`
        section.stickyHeight = section.stickyContent.scrollHeight;
      }
      const rect = section.$el.getBoundingClientRect();
      var top = rect.top;
      var n = top + section.$el.offsetHeight;
      
      section.rect.height = rect.height;
      section.rect.top = top - this.winH + this.data.t;
      section.rect.bottom = n + this.data.t;
      
    }
    this.spaceDelta = this.winH * 0.7;
    this.update();
  }
}
