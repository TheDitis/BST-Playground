<script lang="ts">
    import BST from "./BST";

    export let node: BST<any>;
    export let size: number = 20;
    export let layer: number = 0;


</script>


<div class="BSTNode" style="--size: {size}">
    <h1>{node.value}</h1>
</div>
{#if node.left !== null}
    <svelte:self node={node.left} {size} layer={layer + 1}/>
{/if}
{#if node.right !== null}
    <svelte:self node={node.right} {size} layer={layer + 1}/>
{/if}


<style>
    .BSTNode {
        width: var(--size)px;
        height: var(--size)px;
        background: blue;
    }
</style>