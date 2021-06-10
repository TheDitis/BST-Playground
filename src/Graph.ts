export default class Graph<T> {
    nodes: Node<T>[] = [];
    test: boolean = false

    constructor(nodeValues: T[], connections: number[][]) {
        if (nodeValues.length !== connections.length) {
            throw Error("nodeValues and connections arrays must be of the same length!")
        }
        console.log("constructing graph")
        for (let i in nodeValues) {
            this.nodes.push(new Node<T>(nodeValues[i]))
        }
        this.nodes.forEach((node, i) => {
            for (let ind of connections[i]) {
                node.connectTo(this.nodes[ind])
            }
        })
    }

    get values(): T[] {
        return this.nodes.map(node => node.value)
    }

    set setTest(value: boolean) {
        this.test = value
    }
}

class Node<T> {
    value: T;
    connections: Node<T>[] = [];
    

    constructor(value: T) {
        this.value = value;
    }

    connectTo(node: Node<T>, twoWay: boolean = false) {
        this.connections.push(node);
        if (twoWay) {
            node.connectTo(this);
        }
    }

    re
}