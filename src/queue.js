class _Node {
    constructor(value) {
        this.value = value;
        this.next = null;
//	this.prev = null
    }
}

class Queue {
    constructor(name) {
        this.first = null;
        this.last = null;
	this.name = name;
    }
    enqueue(data) {
        const node = new _Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
//	    node.prev = this.last;
        }

        this.last = node;
    }
    dequeue() {
       if (this.first === null) {
           return;
       }
       const node = this.first;
       this.first = this.first.next;

       if (node === this.last) {
           this.last = null;
       }
       return node.value;
   }
}



module.exports = Queue;
