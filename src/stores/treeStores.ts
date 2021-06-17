import {writable, readable, derived, Writable, get} from "svelte/store"
import BST from "../Structures/BST";


// class Test extends BST<any> {
//     selected: Writable<boolean>;
//
//     constructor(value: number = 0) {
//         super(value);
//         this.selected = writable(false);
//     }
//
//
// }


const createTree = (rootValue: number = 0) => {
    const tree: Writable<BST<number>> = writable(new BST(rootValue))

    const set = (value: number | BST<number>) => {
        if (typeof value === "number") {
            const tempTree = get(tree);
            tempTree.value = value;
            tree.set(tempTree)
        } else {
            tree.set(value)
        }
    }

    const insert = (value: number) => {
        const tempTree = get(tree)
        tempTree.insert(value);
        tree.set(tempTree)
    }

    // set(rootValue)

    return {
        subscribe: tree.subscribe,
        set,
        insert,

    }
}

export const tree = createTree(1);