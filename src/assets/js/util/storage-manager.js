export default class StorageManager {
  constructor(){
    this.appPrefix = 'ELKANO2021174';
  }
  get(key){
    let data = localStorage.getItem(this.appPrefix + key);
    if(data === 'true') data = true;
    if(data === 'false') data = false;
    return data;
  }
  set(key, data){
    localStorage.setItem(this.appPrefix + key, data.constructor === {}.constructor || Array.isArray(data) ? JSON.stringify(data) : data);
  }
  clear(){
    localStorage.clear();
  }
  remove(key){
    localStorage.removeItem(this.appPrefix + key);
  }
}