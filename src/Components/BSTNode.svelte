<script lang="ts">
    import BST from "../Structures/BST";
    import {nthFib} from "../utlis";

    export let node: BST<any>;
    export let x: number = 0;
    // export let xOffset: number = 0
    export let width: number = 500;

    export let size: number = 60;
    export let layer: number = 1;
    export let layerHeight: number = 80;


    $: offset = size / 2;


    const widthDiv = nthFib(layer + 3)

    console.log(`widthDiv for layer ${layer + 1}: ${widthDiv}  spacing: ${width / widthDiv}`)


</script>


<div
        class="BSTNode"
        style="--size: {size}; --top: {(layer - 1) * layerHeight + offset / 2}px; --left: {x}px"
        on:click={() => {
            console.log(`x: ${x}`);
        }}
>
    <h1>{node.value}</h1>
</div>
{#if node.left !== null}
    <svelte:self node={node.left} {size} layer={layer + 1} {layerHeight} {width} x={x - (width / widthDiv)}/>
{/if}
{#if node.right !== null}
    <svelte:self node={node.right} {size} layer={layer + 1} {layerHeight} {width} x={x + (width / widthDiv)}/>
{/if}


<style>
    .BSTNode {
        position: absolute;
        top: var(--top);
        left: var(--left);
        width: calc(var(--size) * 1px);
        height: calc(var(--size) * 1px);
        padding: 0;
        margin: 0;
        background: rgba(0, 200, 200, 0.4);
        border: 2px solid rgba(0, 200, 200, 0.4);
        border-radius: 50%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        margin: 0;
        padding: 0;
    }
</style>