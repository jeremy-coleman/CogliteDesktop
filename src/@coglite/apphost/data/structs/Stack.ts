class Stack {
  items: any[];
  count: number;
  constructor() {
    this.init()
  }

  private init() {
    this.items = [];
    this.count = 0;
  }
  
  getLength() {
    return this.count;
  }
  
  push(item) {
    this.items.push(item);
    this.count = this.count + 1;
  }
  
  pop() {
    if(this.count > 0) {
      this.count = this.count - 1;
    }
    
    return this.items.pop();
  }
  
  peek() {
    return this.items.slice(-1)[0];
  }

  elements() {
    return this.items
  }

  empty() {
    this.init()
  }
}

export {Stack as default, Stack}