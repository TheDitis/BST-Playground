<script lang="ts">
    import BST from "../Structures/BST";

    export let node: BST<any>;
    // export let x: number = 0;
    export let xOffset: number = 0
    export let width: number = 500;

    export let size: number = 60;
    export let layer: number = 0;
    export let layerHeight: number = 80;

    $: offset = size / 2;
</script>


<div
        class="BSTNode"
        style="--size: {size}; --top: {layer * layerHeight + offset / 2}px; --left: {xOffset + (width / 2)}px"
        on:click={() => {
            console.log("xOffset: ", xOffset);
            console.log("width: ", width);
        }}
>
    <h1>{node.value}</h1>
</div>
{#if node.left !== null}
    <svelte:self node={node.left} {size} layer={layer + 1} {layerHeight} width={width - (width / 2)} xOffset={xOffset - xOffset / 2}/>
{/if}
{#if node.right !== null}
    <svelte:self node={node.right} {size} layer={layer + 1} {layerHeight} width={width - (width / 2)} xOffset={xOffset + width / 2}/>
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