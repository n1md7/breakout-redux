type Nullable<T> = T | null;

export class ListNode<T = unknown> {
  constructor(
    public value: T,
    public next: Nullable<ListNode<T>> = null,
  ) {}
}

export class LinkedList<T = unknown> {
  private head: Nullable<ListNode<T>>;
  private tail: Nullable<ListNode<T>>;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value: T) {
    const node = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }
    if (this.tail === null) this.tail = node;
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  remove(value: T) {
    if (this.head === null) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head === null) this.tail = null; // Update tail reference
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        if (current.next === null) this.tail = current; // Update tail reference
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  has(value: T) {
    if (this.head === null) return false;
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.next!;
    }
    return false;
  }

  *[Symbol.iterator]() {
    if (this.head === null) return;
    let current = this.head;
    while (current !== null) {
      yield current.value;
      current = current.next!;
    }
  }

  toArray() {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  getLength() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    return this.head?.value;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
