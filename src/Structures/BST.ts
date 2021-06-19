import _ from "lodash";

// TODO: Catch up on documentation
// TODO: Cache certain properties until structure changes to save resources

// TODO: Create subclass specifically for the svelte interface

interface NodeObject {
    id: string,
    left: string | null,
    right: string | null,
    value: any
}

interface TreeObject {
    root: string,
    nodes: NodeObject[]
}

interface NestedTreeObject {
    tree: TreeObject
}

type InOrderTraversalString = "asc" | "inorder";
type ReverseOrderTraversalString = "desc" | "reverse" | "reverseorder";
type PreOrderTraversalString = "pre" | "preorder";
type PostOrderTraversalString = "post" | "postorder";

type TraversalOrderString = (
    InOrderTraversalString |
    ReverseOrderTraversalString |
    PreOrderTraversalString |
    PostOrderTraversalString
)



export default class BST<T> {
    value: T;
    left: BST<T> | null;
    right: BST<T> | null;

    constructor(
        value: T,
        left: BST<T> | null = null,
        right: BST<T> | null = null
    ) {
        if (value === null) throw Error("Value passed to BST cannot be null")
        this.value = value;
        this.left = left;
        this.right = right;
    }

    insert(value: T) {
        console.log("inserting ", value)
        if (value < this.value) {
            if (this.left === null) {
                this.left = new BST(value);
            } else this.left.insert(value);
        } else {
            if (this.right === null) {
                this.right = new BST(value);
            } else this.right.insert(value);
        }
    }

    remove(value: T) {
        const removeHelper = function (
            node: BST<T>,
            target: T,
            parent: BST<T> | null = null,
            direction: "left" | "right" = "left"
        ) {
            if (node === null) return;

            // if the droids you're looking for are to the left:
            if (target < node.value) {
                removeHelper(node.left, target, node, "left");
            }

            // or if they're to the right:
            else if ( target > node.value) {
                removeHelper(node.right, target, node, "right");
            }

            // if these are the droids you're looking for:
            else {
                // if the droid has no parents:
                if (parent === null) {
                    console.warn(
                        "The droid you are looking for has no parents " +
                        "to remove it from. You're on your own kid. Maybe " +
                        "you could just use the delete operator."
                    )
                }
                // Remove and replace with the closest value
                // if the droids you're looking for are lesser beings, look left
                if (node.hasLeftChild && target < node.value) {
                    let newTarget = node.left.maxVal;
                    removeHelper(node.left, newTarget, node, "left");
                    node.value = newTarget;
                }
                // if they are greater, look right
                else if (node.hasRightChild && target >= node.value) {
                    let newTarget = node.right.minVal;
                    removeHelper(node.right, newTarget, node, "right");
                    node.value = newTarget;
                }
                // if it has a parent but no children
                if (!node.hasChildren) {
                    // separate them from their parents
                    parent[direction] = null;
                }
            }
        }

        removeHelper(this, value);
    }

    copy(shallow: boolean = false): BST<T> {
        if (shallow) {
            console.warn(
                "Warning: the BST.copy() method with shallow set to " +
                "true can cause confusing results. Keeping shallow false " +
                "(default) is recommended."
            )
            return Object.assign(
                Object.create(Object.getPrototypeOf(this)),
                this
            )
        }
        else return this.deepCopy();
    }

    deepCopy(): BST<T> {
        if (!this.isValid) console.error(
            "deepCopy currently only works on valid BSTs. If you manually " +
            "created an invalid BST, this copy will be different."
        )
        const values = this.toArray("preorder");
        const root = new BST(values.shift());
        root.insertAll(values);
        return root;
    }

    contains(value: T): boolean {
        if (this.value === value) return true;

        if (this.left !== null && value < this.value)
            return this.left.contains(value);
        else
            return this.right.contains(value);
    }

    get minVal(): T {
        if (this.hasLeftChild)
            return this.left.minVal;
        return this.value;
    }

    get maxVal(): T {
        if (this.hasRightChild)
            return this.right.maxVal;
        return this.value;
    }

    get depth(): number {
        return BST.calcDepth(this);
    }

    static calcDepth(node: BST<any>): number {
        if (node === null)
            return 0;
        const left = BST.calcDepth(node.left);
        const right = BST.calcDepth(node.right);
        return Math.max(left, right) + 1;
    }

    get maxWidth(): number {
        return BST.maxNodesInLayer(this.depth)
    }

    get hasLeftChild(): boolean {
        return this.left !== null
    }

    get hasRightChild(): boolean {
        return this.right !== null
    }

    get hasChildren(): boolean {
        return this.hasLeftChild || this.hasRightChild
    }

    get childCount(): number {
        let count: number = 0;
        if (this.hasRightChild) count++;
        if (this.hasLeftChild) count++;
        return count;
    }

    get nodeCount(): number {
        const deepCountChildren = (node: BST<T>): number => {
            if (node === null) return 0;
            let leftChildren = deepCountChildren(node.left);
            let rightChildren = deepCountChildren(node.right);
            return 1 + leftChildren + rightChildren;
        }

        return deepCountChildren(this);
    }

    get capacity(): number {
        return this.potentialCapacityAtHeight()
    }

    get freeCapacity(): number {
        return this.capacity - this.nodeCount
    }

    get isValid(): boolean {
        const isValidHelper = (node: BST<T>): [boolean, T, T] => {
            let lOkay: boolean, rOkay: boolean;
            let okayWithLeft = true, okayWithRight = true;
            let lMin: T, lMax: T, rMin: T, rMax: T;
            lMin = lMax = rMin = rMax = node.value;
            if (node.left !== null) {
                [lOkay, lMin, lMax] = isValidHelper(node.left);
                okayWithLeft = (node.value > _.max([lMin, lMax])) && lOkay;
            }
            if (node.right !== null) {
                [rOkay, rMin, rMax] = isValidHelper(node.right);
                okayWithRight = node.value <= _.min([rMin, rMax]) && rOkay;
            }
            let isOkay = okayWithLeft && okayWithRight;
            let newMin = _.min([node.value, lMin, lMax, rMin, rMax]);
            let newMax = _.max([node.value, lMin, lMax, rMin, rMax]);
            return [isOkay, newMin, newMax];
        }

        return isValidHelper(this)[0];
    }

    get isFull(): boolean {
        const isFullHelper = (node: BST<T>): boolean => {
            if (node.left === null && node.right === null)
                return true;
            if (node.left === null || node.right === null)
                return false;
            const leftResult = isFullHelper(node.left);
            const rightResult = isFullHelper(node.right);
            return leftResult && rightResult;
        }

        return isFullHelper(this);
    }

    get isPerfect(): boolean {
        // TODO: make this more efficient
        return this.potentialCapacityAtHeight(this.depth) == this.nodeCount;
    }

    get nodeIsFull(): boolean {
        const nChildren: number = this.childCount;
        return (nChildren === 0 || nChildren === 2)
    }

    get isBalanced(): boolean { return BST.isBalancedWithMaxDepth(this)[0] }

    static isBalancedWithMaxDepth(
        node: BST<any>,
        layer: number = 1
    ): [boolean, number] {
        if (node === null)
            return [true, 0]
        // G
        const [lBalanced, lHeight] =
            BST.isBalancedWithMaxDepth(node.left, layer + 1);

        const [rBalanced, rHeight] =
            BST.isBalancedWithMaxDepth(node.right, layer + 1);

        const sideDiff = Math.abs(lHeight - rHeight);
        return [
            lBalanced && rBalanced && sideDiff <= 1,
            Math.max(lHeight, rHeight) + 1
        ]
    }

    inOrder(asValues: boolean = true, reverse: boolean = false) {
        return this._inOrderRecursive(this, asValues, reverse);
    }

    reverseOrder(asValues: boolean = true) {
        return this._inOrderRecursive(this, asValues, true)
    }

    preOrder(asValues: boolean = true, reverse: boolean = false) {
        if (reverse) return this._postOrderRecursive(this, asValues, reverse);
        return this._preOrderRecursive(this, asValues);
    }

    postOrder(asValues: boolean = true, reverse: boolean = false) {
        if (reverse) return this._preOrderRecursive(this, asValues, reverse);
        return this._postOrderRecursive(this, asValues);
    }

    iter(
        order: TraversalOrderString = "asc",
        asValues: boolean = true,
        reverse: boolean = false
    ) {
        switch (order) {
            case "asc":
            case "inorder":
                return this.inOrder(asValues, reverse);
            case "desc":
            case "reverse":
            case "reverseorder":
                if (reverse) console.warn(
                    "reverse-order iteration of BST does not accept the " +
                    "'reverse' argument. use inorder (default) instead."
                )
                return this.reverseOrder(asValues);
            case "pre":
            case "preorder":
                return this.preOrder(asValues, reverse);
            case "post":
            case "postorder":
                return this.postOrder(asValues, reverse);
            default:
                console.error(
                    `invalid order indicator '${order}' passed to BST.iter(). `
                    + `Valid values are 'asc' (default) for in-order, 'desc' `
                    + `for reverse-order, 'pre' for pre-order, 'post' for `
                    + `post-order. Defaulting to in-order iteration`
                )
                return this.inOrder(asValues);
        }
    }

    toArray(
        order: TraversalOrderString = "asc",
        reverse: boolean = false
    ): T[] {
        return Array.from(this.iter(order, true, reverse))
    }

    * _inOrderRecursive(
        node: BST<T> | null,
        asValues: boolean = true,
        reverse: boolean = false
    ) {
        if (node !== null) {
            let children = [node.left, node.right];
            if (reverse) children.reverse();
            yield* this._inOrderRecursive(children[0], asValues, reverse);
            yield asValues ? node.value : node;
            yield* this._inOrderRecursive(children[1], asValues, reverse);
        }
    }

    * _preOrderRecursive(
        node: BST<T> | null,
        asValues: boolean = true,
        reverse: boolean = false
    ) {
        if (node !== null) {
            let children = [node.left, node.right];
            if (reverse) children.reverse();
            yield asValues ? node.value : node;
            yield* this._preOrderRecursive(children[0], asValues, reverse);
            yield* this._preOrderRecursive(children[1], asValues, reverse);
        }
    }

    * _postOrderRecursive(
        node: BST<T> | null,
        asValues: boolean = true,
        reverse: boolean = false
    ) {
        if (node !== null) {
            let children = [node.left, node.right];
            if (reverse) children.reverse();
            yield* this._postOrderRecursive(children[0], asValues, reverse);
            yield* this._postOrderRecursive(children[1], asValues, reverse);
            yield asValues ? node.value : node;
        }
    }

    invert() {

        const invertHelper = (node: BST<T> | null): BST<T> | null => {
            if (node === null) return null;

            const tempLeft = node.left;
            node.left = invertHelper(node.right);
            node.right = invertHelper(tempLeft);

            return node;
        }

        invertHelper(this);
    }

    inverted(): BST<T> {
        const selfCopy = this.deepCopy();
        selfCopy.invert();
        return selfCopy;
    }

    static maxNodesInLayer(layerNum: number): number {
        if (layerNum <= 0) {
            console.error("layerNum passed to BST.maxNodes() must be an " +
                "integer greater than 0!")
            return 0;
        }
        let accumulator = 1;
        for (let i = 1; i < layerNum; i++)
            accumulator *= 2;
        return accumulator
    }

    static layerCapacities(numLayers): number[] {
        if (numLayers === 0) return [];

        const output: number[] = [1];
        for (let i of _.range(1, numLayers)) {
            output.push(output[i - 1] * 2);
        }
        return output;
    }

    potentialCapacityAtHeight(numLayers: number | null = null): number {
        if (numLayers === null) numLayers = this.depth;
        return BST.potentialCapacityAtHeight(numLayers);
    }

    static potentialCapacityAtHeight(numLayers: number | null = null): number {
        const layerCaps = BST.layerCapacities(numLayers)
        return layerCaps.reduce((a, b) => a + b, 0);
    }

    static from(source: TreeObject | { tree: TreeObject }): BST<any>;
    static from(source: any[]): BST<any>;
    static from(source: any[] | TreeObject | { tree: TreeObject }) : BST<any> {
        if (source instanceof Array) return BST.fromArray(source);
        return this.fromObject(source);
    }

    static fromObject(
        treeObj: TreeObject | { tree: TreeObject }
    ): BST<any> {
        if ("tree" in treeObj) treeObj = treeObj.tree;
        const nodes = {}
        for (let node of treeObj.nodes) nodes[node.id] = node;

        const constructionHelper = (nodeId: string | null): BST<any> => {
            if (nodeId === null) return null;
            const nodeObj: NodeObject = nodes[nodeId];
            const node = new BST(nodeObj.value);
            node.left = constructionHelper(nodeObj.left);
            node.right = constructionHelper(nodeObj.right);
            return node;
        }

        return constructionHelper(treeObj.root)
    }

    /**
     * Creates a new BST from the given array of values
     * @param {[]} values - array of values you want to construct a BST out of
     * @param {boolean} [minHeight=true] - if true the given tree will be of
     *      minimum possible height, otherwise items
     *      will be inserted in order
     * @return {BST | null} - BST root node of tree containing given values, or
     *      null if an empty array was passed
     */
    static fromArray(
        values: any[],
        minHeight: boolean = true
    ): BST<any> | null {
        if (!values.length) console.warn(
            "An empty array was passed to BST.fromArray(). Returning null."
        );
        if (minHeight) return BST.constructMinHeight(values)
        else return BST.constructInOrder(values);
    }

    /**
     * Recursively constructs a bst. Returns
     * @param {[]} values - array of values to be constructed into a
     *      minimum-height BST
     * @return {BST | null} BST node if the length of values is at least 1, null
     *      otherwise
     */
    static constructMinHeight(values: any[]): BST<any> | null {

        function minHeightConstructor(array: any[]): BST<any> | null {
            // TODO: make this able to handle repeat numbers without becoming
            //  invalid if easily possible, or at least implement isValid
            if (array.length == 0) return null;

            // Create a new node from the middle value of the input array
            const midInd: number = Math.floor(array.length / 2);
            const node: BST<any> = new BST(array[midInd]);

            // run recursively for everything below that value
            node.left = minHeightConstructor(array.slice(0, midInd));
            node.right = minHeightConstructor(array.slice(midInd + 1));
            return node;
        }

        const sorted = Array.from(values);
        sorted.sort((a, b) => a - b);

        return minHeightConstructor(sorted);
    }

    /**
     * Initializes a root BST node from values[0] and inserts each subsequent
     *      value to that node
     * @param {[]} values - an array of values you want to create a bst from,
     *      inserted in its original order
     * @return {BST | null} - The root node of the newly constructed BST
     */
    static constructInOrder(values: any[]): BST<any> | null {
        if (!values.length) return null;
        const root = new BST(values[0]);
        root.insertAll(values.slice(1));
        return root;
    }


    static reconstructFromPreOrder(preOrderValues: any[]): BST<any> | null {
        return BST.constructInOrder(preOrderValues);
    }


    /**
     * Calls this.insert for each value in passed array
     * @param {[]} values - array of values to insert to this node
     */
    insertAll(values: T[]) {
        for (let value of values) this.insert(value);
    }

    /**
     * Creates a full, perfect BST with a given number of layers
     * @param {number} [numLayers=3] - the number of layers the tree should have
     * @param {number} [step=1] - the difference in value between parent & child
     * @param {number} [min=0] - the minimum value in the tree (leftmost node)
     * @return {BST} A full and perfect min-height bst with 'numLayers' layers,
     *      with a minimum value of 'min', with values spaced by 'step'
     */
    static constructFullPerfectTree = (
        numLayers: number = 3,
        step: number = 1,
        min: number = 0,
    ): BST<number> => {
        const cap: number = BST.potentialCapacityAtHeight(numLayers)
        return BST.fromArray(
            _.range(
                min,
                (min + cap) * step,
                step
            )
        );
    }


}



