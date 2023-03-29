/* eslint-disable */
import Util from "../util/util";

export default class Slider {
  constructor(options){
    this.el = options.el;
    this.content = options.content;
    this.prevButton = options.prevButton;
    this.nextButton = options.nextButton;
    this.margin = options.margin;
    this.isMobile = window.innerWidth < 1024;
    this.items = [];
    this.itemsL = this.items.length;
    this.paralax = [];
    this.max = this.el.scrollWidth;
    this.bar = this.el.querySelector('.bar');
    this.maxBar = this.bar ? this.bar.parentElement.clientWidth : 0;
    this.barW = 0;
    this.clickdown = false;
    this.touch = {prev: 0, start: 0};
    this.target = 0;
    this.event = {};
    this.pause = false;
    this.data = {t: 0, c: 0};
    this.pauseEvents = false;
    this.render = this.render.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.clickStart = this.clickStart.bind(this);
    this.clickUp = this.clickUp.bind(this);
    this.onMove = this.onMove.bind(this);
    this.eventsManager = this.eventsManager.bind(this);
    this.resize = this.resize.bind(this);
    this.init();
  }
  init(){
    this.el.addEventListener('touchstart', this.touchStart, { passive: false });
    this.el.addEventListener('touchmove', this.onMove, { passive: false });
    this.el.addEventListener('mousedown', this.clickStart);
    document.addEventListener('mouseup', this.clickUp);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseWheel', this.onMove, { passive: false });
    document.addEventListener('wheel', this.onMove);
    document.addEventListener('keydown', this.onMove);
    this.el.classList.add('horizontal-slider');
    Array.from(this.content.children).forEach(item => {
      let s = {};
      s.$el = item;
      s.$el.classList.add('item');
      s.rect = {};
      s.out = true;
      this.items.push(s);
    });
    this.itemsL = this.items.length;
    
    this.resize();
    window.addEventListener('resize', () => {
      clearTimeout(this.resizedFinished);
      this.resizedFinished = setTimeout(() => {
        this.resize();
      }, 250);
    });
    this.render();
  }
  touchStart(e){
    this.touch.prev = this.target;
    this.touch.start = e.targetTouches[0].pageX;
  }
  clickStart(e){
    this.clickdown = true;
    this.touch.prev = this.target;
    this.touch.start = e.clientX;
  }
  clickUp(e){
    this.clickdown = false;
  }
  onMove(e){
    this.event = e;
    this.prevent(e);
    if(!this.pauseEvents && !this.pause && Util.isInViewport(this.el)){
      requestAnimationFrame(this.eventsManager);
      this.pauseEvents = true;
    }
  }
  prevent(t) {
    if(t.cancelable && "keydown" !== t.type && !this.isMobile)
    t.preventDefault();
  }
  eventsManager() {
    var t = this.event.type;
    switch (t) {
      case "touchmove":
        this.touchMove()
      case "mousemove":
        this.mouseMove()
      break;
      case "wheel":
        this.wheel()
        break;
      case "mousewheel":
        this.mouseWheel()
        break;
      case "keydown":
        this.keyDown()
      break;
      default:
      break;
    }
  }
  touchMove(){
    var t = this.event.targetTouches[0].pageX - this.touch.start;
    this.target = 1.5 * t + this.touch.prev;
    this.update();
  }
  mouseMove(){
    if(this.clickdown){
      var t = this.event.clientX - this.touch.start;
      this.target = 1.5 * t + this.touch.prev;
      this.update();
    }else{
      this.pauseEvents = false;
    }
  }
  mouseWheel() {
    this.pausePointer = false;
    var t = this.event.wheelDeltaX ? this.event.wheelDeltaX : this.event.wheelDelta;
    this.delta = t;
    this.target += this.delta;
    this.update();
  }
  wheel() {
    this.pausePointer = false;
    var t = this.event.wheelDeltaX || -1 * this.event.deltaX;
    if (Util.testBrowser('firefox') && this.event.deltaMode)
      t *= 60;
    t *= .554;
    this.delta = t;
    this.target += this.delta;
    this.update()
  }
  prev() {
    this.target += this.spaceDelta;
    this.update();
  }
  next() {
    this.target += -this.spaceDelta;
    this.update();
  }
  keyDown () {
    var t, kc = this.event.keyCode;
    if(Util.isInViewportDom(this.el)){
      if(kc === 37)
        t = this.spaceDelta;
      else if(39 === kc)
        t = -this.spaceDelta;
      else
        t =  0;
      
      this.target += t;
      this.update();
    }else{
      this.pauseEvents = false;
    }
  }
  scrollTo(t){
    this.target = Util.round(Math.max(Math.min(-t, 0), -this.max));
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
  getMax(){
    var offset = this.content.offsetWidth;
    var iw = window.innerWidth;
    this.max = Math.max(offset - iw, 0);
    this.data.t = Util.round(Math.min(this.data.t, this.max));
    this.data.c = this.data.t;
  }
  render(){
    this.data.c += .12 * (this.data.t - this.data.c);
    var final = Util.round(this.data.c);
    if(final !== this.data.t)
      this.updateElements(final);
    requestAnimationFrame(this.render);
  }
  addParalax(fun) {
    if(this.paralax.indexOf(fun) === -1)
    this.paralax.push(fun);
  }
  removeParalax(fun) {
    this.paralax.splice(this.paralax.indexOf(fun), 1);
  }
  updateElements(target){
    this.translateBar(target);

    for (var i = 0; i < this.itemsL; ++i) {
      var item = this.items[i];
      if(target >= item.rect.left && target <= item.rect.right){
        item.out = false;
        this.translate(item, target);
      }else if(!item.out){
        item.out = true;
        this.translate(item, target);
      }
    }
  }
  translate(item, target) {
    item.$el.style.transform = `translateX(${-target}px)`;
    var rect = item.$el.getBoundingClientRect();
    if(rect.left + rect.width * 0.5 - this.winW > 0) {
      item.$el.classList.add('item-almost');
    }else {
      item.$el.classList.remove('item-almost');
    }
  }
  translateBar(target){
    if(this.bar) {
      const p = target/this.max;
      const barX = this.maxBar * p - Util.lerp(0, this.barW, p);
      this.bar.style.transform = `translate3d(${barX}px, 0, 0)`;
    }
  }
  resize (){
    this.isMobile = window.innerWidth <= 1024;
    this.content.style.transition = 'none';
    this.content.style.transform = 'none';
    this.margin = document.querySelector('.container').getBoundingClientRect().left;
    this.items[0].$el.style.marginLeft = this.margin + 'px';
    this.items[this.itemsL - 1].$el.style.marginRight = (this.margin + (window.innerWidth - this.el.clientWidth)) + 'px';
    if(this.bar) this.maxBar = this.bar.parentElement.clientWidth;
    this.getMax();
    var ww = window.innerWidth;
    this.winW = ww;
    const offset = 0;
    for (var i = 0; i < this.itemsL; ++i) {
      var item = this.items[i];
      this.translate(item, this.data.t);
      var left = item.$el.getBoundingClientRect().left - offset;
      var n = left + item.$el.offsetWidth;
      
      item.rect.left = left - ww + this.data.t;
      item.rect.right = n + this.data.t;
    }
    this.spaceDelta = ww * (this.isMobile ? 0.8 : 0.2);
    if(this.bar) {
      this.barW = this.maxBar * (this.maxBar / this.max);
      if(this.barW > this.maxBar * 0.7)
        this.barW = this.maxBar * 0.7;
      this.bar.style.width = `${this.barW}px`;
    }
    this.update();
    this.content.removeAttribute('style');
  }
}