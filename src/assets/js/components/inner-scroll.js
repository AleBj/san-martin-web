/* eslint-disable */
import { gsap } from 'gsap'
import Util from '../util/util';

export default class ScrollCtrl {
  constructor(options) {
    this.mask = options.mask;
    this.content = options.content;
    
    this.isFirefox = Util.testBrowser('firefox');
    this.isIE = Util.testBrowser('ie');
    this.m = this.isIE ? 0.12 : 0.09;
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
    this.isMobile = this.winW <= 1024;
    this.paralax = options.paralax;
    this.max = this.content.scrollHeight;
    this.maxDelta = 80;
    this.touch = { prev: 0, start: 0 };
    this.target = 0;
    this.event = {};
    this.pause = false;
    this.data = { t: 0, c: 0 };
    this.delta = 0;
    this.pauseEvents = false;
    this.render = this.render.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.onMove = this.onMove.bind(this);
    this.eventsManager = this.eventsManager.bind(this);
    this.resize = this.resize.bind(this);
    this.init();
  }
  init() {
    document.addEventListener('touchstart', this.touchStart, { passive: false });
    document.addEventListener('touchmove', this.onMove, { passive: false });
    document.addEventListener('mouseup', this.clickUp);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseWheel', this.onMove, { passive: false });
    document.addEventListener('wheel', this.onMove);
    document.addEventListener('keydown', this.onMove);
    
    this.resize();
    this.updateElements(0);
    window.addEventListener('resize', this.resize);
    this.render();
  }
  touchStart(e) {
    this.touch.prev = this.target;
    this.touch.start = e.targetTouches[0].pageY;
  }
  clickStart(e){
    this.clickdown = true;
    this.touch.prev = this.target;
    this.touch.start = e.clientY;
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
    var t = this.event.targetTouches[0].pageY - this.touch.start;
    this.delta = 1.2 * t;
    this.target = this.delta + this.touch.prev;
    this.update();
  }
  mouseMove(){
    this.pauseEvents = false;
  }
  mouseWheel() {
    var t = this.event.wheelDeltaY ? this.event.wheelDeltaY : this.event.wheelDelta;
    this.delta = t;
    this.target += this.delta;
    this.update();
  }
  wheel() {
    var t = this.event.wheelDeltaY || -1 * this.event.deltaY;
    if (this.isFirefox && this.event.deltaMode)
    t *= 60;
    if(this.isIE)
    t *= 2;
    t *= .554;
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
  update() {
    this.target = Util.round(Math.max(Math.min(this.target, 0), -this.max));
    this.scroll(-this.target);
    this.pauseEvents = false;
  }
  scroll(t) {
    this.data.t = Util.round(t);
  }
  getMax() {
    var height = this.content.offsetHeight;
    var offset = this.mask.getBoundingClientRect().top;
    var ih = window.innerHeight - offset;
    this.max = Math.max(height - ih, 0);
    this.data.t = Util.round(Math.min(this.data.t, this.max));
    this.data.c = this.data.t;
  }
  render() {
    this.data.c += this.m * (this.data.t - this.data.c);
    var final = Util.round(this.data.c);
    if (final !== this.data.t) {
      this.updateElements(final);
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
      this.paralax.forEach(p => p(target, this.max, this.delta));
    }
    this.translate(this.content, target);
  }
  translate($el, target) {
    $el.style.transform = `translate3d(0, ${-target}px, 0)`;
  }
  resize() {
    this.getMax();
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
    this.isMobile = this.winW <= 1024;
    this.translate(this.content, this.data.t);
    this.spaceDelta = this.winH * 0.7;
    this.update();
  }
  destroy() {
    document.removeEventListener('touchmove', this.onMove);
    document.removeEventListener('mouseup', this.clickUp);
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseWheel', this.onMove);
    document.removeEventListener('wheel', this.onMove);
    document.removeEventListener('keydown', this.onMove);
    
    window.removeEventListener('resize', this.resize);
  }
}
