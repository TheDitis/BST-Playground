// Feel free to add new properties and methods to the class.
export class MinMaxStack {
    private readonly _values: number[];
    private _length: number;

    private _min: number;
    private _max: number;

    constructor(values: number[] = []) {
        this._values = values;
        this._length = values.length;

        this._min = this._length > 0 ? Math.min(...values) : Infinity;
        this._max = this._length > 0 ? Math.max(...values) : -Infinity;
    }

    get isEmpty(): boolean { return this._length === 0 }

    get min(): number | undefined { return this.getMin() }

    get max(): number | undefined { return this.getMax() }

    peek(): number | undefined {
        if (this.isEmpty) return undefined;
        return this._values[this._length - 1];
    }

    pop(): number | undefined {
        if (this.isEmpty) return undefined;
        const removed: number | undefined = this._values.pop();
        this._length -= 1;
        if (removed === this._min) this.reCalculateMin();
        if (removed === this._max) this.reCalculateMax();
        return removed;
    }

    push(value: number) {
        this._length += 1;
        this._values.push(value);
        if (value < this._min) this._min = value;
        if (value > this._max) this._max = value;
    }

    getMin(): number | undefined {
        if (this.isEmpty) return undefined;
        return this._min;
    }

    getMax(): number | undefined {
        if (this.isEmpty) return undefined;
        return this._max;
    }

    reCalculateMin() {
        let min = Infinity;
        for (let val of this._values) {
            if (val < min) min = val;
        }
        this._min = min;
    }

    reCalculateMax() {
        let max = -Infinity;
        for (let val of this._values) {
            if (val > max) max = val;
        }
        this._max = max;
    }
}
