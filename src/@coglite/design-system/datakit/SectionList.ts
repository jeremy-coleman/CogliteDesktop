/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/

//https://github.com/phosphorjs/phosphor-sectionlist/blob/master/src/index.ts


/**
 * An object which manages a collection of variable sized sections.
 *
 * A section list is well suited to managing row heights in virtually
 * scrolling list controls. In these controls, most rows are uniform
 * height while a handful of rows are variable sized. A pair of lists
 * can be used to efficiently manage a virtually scrolling data grid.
 *
 * A section list has guaranteed `O(log n)` worst-case performance for
 * most operations, where `n` is the number of variable sized sections.
 */
export class SectionList {
  get count(): number {
    return this._root !== null ? this._root.count : 0;
  }

  get size(): number {
    return this._root !== null ? this._root.size : 0;
  }

  indexOf(offset: number): number {
    if (this._root === null || offset < 0 || offset >= this._root.size) {
      return -1;
    }
    return indexOf(this._root, offset);
  }

  offsetOf(index: number): number {
    if (this._root === null) {
      return -1;
    }
    var i = Math.floor(index);
    if (i < 0 || i >= this._root.count) {
      return -1;
    }
    return offsetOf(this._root, i);
  }

  sizeOf(index: number): number {
    if (this._root === null) {
      return -1;
    }
    var i = Math.floor(index);
    if (i < 0 || i >= this._root.count) {
      return -1;
    }
    return sizeOf(this._root, i);
  }

  insert(index: number, count: number, size: number): number {
    var ct = Math.floor(count);
    if (ct <= 0) {
      return -1;
    }
    if (this._root === null) {
      this._root = createLeaf(ct, ct * Math.max(0, size));
      return 0;
    }
    var i = Math.max(0, Math.min(Math.floor(index), this._root.count));
    this._root = insert(this._root, i, ct, Math.max(0, size));
    return i;
  }


  remove(index: number, count: number): number {
    if (this._root === null) {
      return 0;
    }
    var ct = Math.floor(count);
    if (ct <= 0) {
      return 0;
    }
    var s = Math.floor(index);
    var i = Math.max(0, s);
    var j = Math.min(s + ct - 1, this._root.count - 1);
    var n = j - i + 1;
    if (n <= 0) {
      return 0;
    }
    this._root = remove(this._root, i, n);
    return n;
  }


  resize(index: number, count: number, size: number): number {
    if (this._root === null) {
      return 0;
    }
    var ct = Math.floor(count);
    if (ct <= 0) {
      return 0;
    }
    var s = Math.floor(index);
    var i = Math.max(0, s);
    var j = Math.min(s + ct - 1, this._root.count - 1);
    var n = j - i + 1;
    if (n <= 0) {
      return 0;
    }
    this._root = remove(this._root, i, n);
    if (this._root === null) {
      this._root = createLeaf(n, n * Math.max(0, size));
    } else {
      this._root = insert(this._root, i, n, Math.max(0, size));
    }
    return n;
  }

  private _root: ISpan = null;
}


interface ISpan {

  count: number;
  size: number;
  level: number;
  left: ISpan;
  right: ISpan;
}



function createLeaf(count: number, size: number): ISpan {
  return { count: count, size: size, level: 0, left: null, right: null };
}

function createBranch(left: ISpan, right: ISpan): ISpan {
  var count = left.count + right.count;
  var size = left.size + right.size;
  var level = Math.max(left.level, right.level) + 1;
  return { count: count, size: size, level: level, left: left, right: right };
}


function updateBranch(span: ISpan, left: ISpan, right: ISpan): ISpan {
  span.count = left.count + right.count;
  span.size = left.size + right.size;
  span.level = Math.max(left.level, right.level) + 1;
  span.left = left;
  span.right = right;
  return span;
}


function indexOf(span: ISpan, offset: number): number {
  var index = 0;
  while (span.level !== 0) {
    var left = span.left;
    if (offset < left.size) {
      span = left;
    } else {
      span = span.right;
      index += left.count;
      offset -= left.size;
    }
  }
  return index + Math.floor(offset * span.count / span.size);
}


function offsetOf(span: ISpan, index: number): number {
  var offset = 0;
  while (span.level !== 0) {
    var left = span.left;
    if (index < left.count) {
      span = left;
    } else {
      span = span.right;
      index -= left.count;
      offset += left.size;
    }
  }
  return offset + index * span.size / span.count;
}

function sizeOf(span: ISpan, index: number): number {
  while (span.level !== 0) {
    var left = span.left;
    if (index < left.count) {
      span = left;
    } else {
      span = span.right;
      index -= left.count;
    }
  }
  return span.size / span.count;
}

function insert(span: ISpan, index: number, count: number, size: number): ISpan {
  if (span.level === 0) {
    if (size === span.size / span.count) {
      span.count += count;
      span.size += count * size;
      return span;
    }
    if (index === 0) {
      return createBranch(createLeaf(count, count * size), span);
    }

    if (index >= span.count) {
      return createBranch(span, createLeaf(count, count * size));
    }

    var rest = span.count - index;
    var each = span.size / span.count;
    var subLeft = createLeaf(count, count * size);
    var subRight = createLeaf(rest, rest * each);
    var newLeft = createLeaf(index, index * each);
    var newRight = createBranch(subLeft, subRight);
    return updateBranch(span, newLeft, newRight);
  }

  if (index < span.left.count) {
    span.left = insert(span.left, index, count, size);
  } else {
    span.right = insert(span.right, index - span.left.count, count, size);
  }

  return rebalance(span);
}

function remove(span: ISpan, index: number, count: number): ISpan {

  if (count === span.count) {
    return null;
  }

  if (span.level === 0) {
    var rest = span.count - count;
    var each = span.size / span.count;
    span.size = rest * each;
    span.count = rest;
    return span;
  }

  if (index < span.left.count && index + count > span.left.count) {
    var tail = span.left.count - index;
    span.left = remove(span.left, index, tail);
    span.right = remove(span.right, 0, count - tail);
  } else if (index < span.left.count) {
    span.left = remove(span.left, index, count);
  } else {
    span.right = remove(span.right, index - span.left.count, count);
  }

  if (span.left === null) {
    span = span.right;
  } else if (span.right === null) {
    span = span.left;
  }

  if (span.level > 0) {
    do {
      span = rebalance(span);
    } while (Math.abs(span.left.level - span.right.level) > 1);
  }
  return span;
}


function rebalance(span: ISpan): ISpan {
  var left = span.left;
  var right = span.right;
  var balance = left.level - right.level;
  if (balance > 1) {
    var subLeft = left.left;
    var subRight = left.right;
    if (subLeft.level > subRight.level) {
      // Left-Left
      span.left = subLeft;
      span.right = updateBranch(left, subRight, right);
    } else {
      // Left-Right
      span.left = updateBranch(left, subLeft, subRight.left);
      span.right = updateBranch(subRight, subRight.right, right);
    }
  } else if (balance < -1) {
    var subLeft = right.left;
    var subRight = right.right;
    if (subRight.level > subLeft.level) {
      // Right-Right
      span.right = subRight;
      span.left = updateBranch(right, left, subLeft);
    } else {
      // Right-Left
      span.right = updateBranch(right, subLeft.right, subRight);
      span.left = updateBranch(subLeft, left, subLeft.left);
    }
  }
  return updateBranch(span, span.left, span.right);
}




/**
 * Rebalance a span so that it maintains the AVL balance invariant.
 *
 * The given span must be a branch. If the span is already balanced,
 * no rotations will be made. The branch data is always updated to
 * be current based on the current children.
 *
 * This assumes the balance factor for the span will be within the
 * range of [-2, 2]. If the balance factor is outside this range,
 * the branch will need to be rebalanced multiple times in order
 * to maintain the AVL balance invariant.
 *
 * The return value is the span which should take the place of the
 * original span in the tree, and may or may not be a different span.
 *
 * Four unbalanced conditions are possible:
 *
 * Left-Left
 * -------------------------------------
 *        span                span
 *        /  \                /  \
 *       /    \              /    \
 *      1      D            2      1
 *     / \          =>     / \    / \
 *    /   \               A   B  C   D
 *   2     C
 *  / \
 * A   B
 *
 * Left-Right
 * -------------------------------------
 *     span                span
 *     /  \                /  \
 *    /    \              /    \
 *   1      D            1      2
 *  / \          =>     / \    / \
 * A   \               A   B  C   D
 *      2
 *     / \
 *    B   C
 *
 * Right-Right
 * -------------------------------------
 *   span                     span
 *   /  \                     /  \
 *  /    \                   /    \
 * A      1                 1      2
 *       / \        =>     / \    / \
 *      /   \             A   B  C   D
 *     B     2
 *          / \
 *         C   D
 *
 * Right-Left
 * -------------------------------------
 *   span                   span
 *   /  \                   /  \
 *  /    \                 /    \
 * A      1               2      1
 *       / \      =>     / \    / \
 *      /   \           A   B  C   D
 *     2     D
 *    / \
 *   B   C
 */