import Util from "../util/util";
export default class Columns {
  constructor(options){
    this.$el = options.$el;
    this.number = options.number;
    this.onChange = options.onChange;
    this.margin = options.margin ? options.margin : 0;
    this.items = Array.from(options.items).map((item, i) => {
      item.setAttribute('data-order', i);
      return item.cloneNode(true);
    });
    this.evenColumns = [];
    if(window.innerWidth > 780) {
      this.resize();
      window.addEventListener('resize', () => {
        this.resize();
      });
    }
  }
  resize () {
    this.width = this.$el.clientWidth;
    let number = this.number;
    if(window.innerWidth <= 1140)
      number = this.number - 1;
    if(window.innerWidth <= 900 && number > 2)
      number = this.number - 2;
    this.$el.innerHTML = '';
    const itemsPerColumn = Math.floor(this.items.length / number);

    const items = [...this.items];
    const cWidth = (this.width - (this.margin * (number - 1))) / number;
    this.columns = [];
    let cIndex = 0;
    
    for (let i = 0; i < number; i++) {
      const column = document.createElement('div');
      column.classList.add('column');
      column.style.width = `${cWidth}px`;
      column.style.marginRight = `${this.margin}px`;
      this.columns.push(column);
      this.$el.append(column);
    }
    items.forEach(item => {
      this.columns[cIndex].append(item.cloneNode(true));
      cIndex++;
      if(cIndex > number - 1) cIndex = 0;
    });
    const largestColumn = 0
    this.columns.forEach((column, i) => {
      if(column.children.length > this.columns[largestColumn].children.length) largestColumn = i
    })
    if(largestColumn !== this.columns.length && items.length % 2 === 0) {
      this.columns[this.columns.length - 1].append(this.columns[0].children[this.columns[0].children.length - 1])
    }
    this.columns[this.columns.length - 1].style.marginRight = '0';
    this.evenColumns = Array.from(this.$el.querySelectorAll('.column:nth-child(even)'));
    this.evenColumns.forEach(item => item.setAttribute('data-scroll-speed', '0.7'))
    this.onChange();
  }
  updateItems(items) {
    this.items = Array.from(items).map((item, i) => {
      item.setAttribute('data-order', i);
      return item.cloneNode(true);
    });
    this.resize();
  }
}