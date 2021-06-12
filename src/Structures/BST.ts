import _ from "lodash";

export default class BST<T> {
    value: T;
    left: BST<T> | null = null;
    right: BST<T> | null = null;

    constructor(value: T) {
        this.value = value;
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

    get hasLeftChild(): boolean { return this.left !== null }

    get hasRightChild(): boolean { return this.right !== null }

    get hasChildren(): boolean {
        return this.hasLeftChild || this.hasRightChild
    }

    get childCount(): number {
        let count: number = 0;
        if (this.hasRightChild)
            count++;
        if (this.hasLeftChild)
            count++;
        return count;
    }

    get isFull(): boolean {
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
                    `invalid order indicator '${order}' passed to BST.iter(). `
                    + `Valid values are 'asc' (default) for in-order, 'desc' `
                    + `for reverse-order, 'pre' for pre-order, 'post' for `
                    + `post-order. Defaulting to in-order iteration`
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
        console.log("layerCaps for ", numLayers, " layers: ", layerCaps)
        return layerCaps.reduce((a, b) => a + b, 0);
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
        console.log(`cap at ${numLayers} layers: ${cap}`)
        return BST.fromArray(
            _.range(
                min,
                (min + cap) * step,
                step
            )
        );
    }


}