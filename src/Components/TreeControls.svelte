<script lang="ts">
    import BST from "../Structures/BST";
    import {tick} from "svelte";
    import {sizes} from "../stores/stores";
    import DragResizeBar from "./DragResizeBar.svelte";

    export let tree: BST<any>;
    export let width: number;

    let dragBar: HTMLElement;

    let number: number = 0;

    const insertNumber = () => {
        tree.insert(number)
        tree = tree.copy();
    }


</script>


<div class="TreeControls" style="--barWidth: {$sizes.controls[0]}px">

    <div class="contentSection">
        <div class="insertSection">
            <input class="input" type="number" bind:value={number}/>
            <button on:click={insertNumber}>Insert</button>
        </div>
    </div>
    <DragResizeBar side="right" />
</div>


<style>
    .TreeControls {
        display: flex;
        position: relative;
        max-width: var(--barWidth);
        width: var(--barWidth);
        z-index: 100;
        border-right: 10px solid rgba(42, 42, 42, 1);
        /*box-sizing: border-box;*/
    }

    .dragBar {
        position: absolute;
        right: -10px;
        height: 100%;
        width: 10px;
        user-select: none;
        user-focus: none;
        background: rgba(0, 0, 0, 0.5);
    }

    .contentSection {
        /*height: 100%;*/
    }
</style>