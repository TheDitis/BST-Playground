export default class BST<T> {
    value: T;
    left: BST<T> | null = null;
    right: BST<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }

    get depth(): number {
        const calcDepth = (node: BST<T>): number => {
            if (node !== null) {
                const left = calcDepth(node.left);
                const right = calcDepth(node.right);
                return Math.max(left, right) + 1;
            }
            return 0;
        }
        return calcDepth(this);
    }

    insert(value: T) {
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BST(value);
            }
            else this.left.insert(value);
        }
        else {
            if (this.right === null) {
                this.right = new BST(value);
            }
            else this.right.insert(value);
        }
    }

    inOrder(asValues: boolean = true) {
        return this._inOrderRecursive(this, asValues);
    }

    reverseOrder(asValues: boolean = true) {
        return this._reverseOrderRecursive(this, asValues);
    }

    preOrder(asValues: boolean = true) {
        return this._preOrderRecursive(this, asValues);
    }

    postOrder(asValues: boolean = true) {
        return this._postOrderRecursive(this, asValues);
    }

    iter(
        order: "asc" | "desc" | "pre" | "post" = "asc",
        asValues: boolean = true
    ) {
        switch (order) {
            case "asc":
                return this.inOrder(asValues);
            case "desc":
                return this.reverseOrder(asValues);
            case "pre":
                return this.preOrder(asValues);
            case "post":
                return this.postOrder(asValues);
            default:
                console.error(
                    `invalid order indicator '${order}' passed to BST.iter(). Valid values are 'asc' (default) for ` +
                    `in-order, 'desc' for reverse-order, 'pre' for pre-order, 'post' for post-order. Defaulting to ` +
                    `in-order iteration`
                )
                return this.inOrder(asValues);
        }
    }

    * _inOrderRecursive (node: BST<T> | null, asValues: boolean = true) {
        if (node !== null) {
            yield* this._inOrderRecursive(node.left, asValues);
            yield asValues ? node.value : node;
            yield* this._inOrderRecursive(node.right, asValues);
        }
    }

    * _reverseOrderRecursive (node: BST<T> | null, asValues: boolean = true) {
        if (node !== null) {
            yield* this._reverseOrderRecursive(node.right, asValues);
            yield asValues ? node.value : node;
            yield* this._reverseOrderRecursive(node.left, asValues);
        }
    }

    * _preOrderRecursive (node: BST<T> | null, asValues: boolean = true) {
        if (node !== null) {
            yield asValues ? node.value : node;
            yield* this._preOrderRecursive(node.right, asValues);
            yield* this._preOrderRecursive(node.left, asValues);
        }
    }

    * _postOrderRecursive (node: BST<T> | null, asValues: boolean = true) {
        if (node !== null) {
            yield* this._postOrderRecursive(node.right, asValues);
            yield* this._postOrderRecursive(node.left, asValues);
            yield asValues ? node.value : node;
        }
    }


}