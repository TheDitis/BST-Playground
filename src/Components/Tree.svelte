<script lang="ts">
    import BSTNode from "./BSTNode.svelte";
    import BST from "../Structures/BST";

    export let tree: BST<any>;
    export let width: number = null;
    export let height: number | null = null;
    export let layerHeight: number = 100;
    export let nodeSize: number = 60;

    console.log("height: ", height)

    if (height !== null) {
        // TODO: See if you can make tree a required parameter when at wifi, or handle absence
        layerHeight = Math.floor(height / tree.depth)
    }
</script>

{#if layerHeight}
    <div
            class="Tree"
            style="
                --height: {layerHeight * tree.depth}px;
                --width: {width}px;
                --topPadding: {nodeSize / 2}px;
            "
    >
        <BSTNode node={tree} nodeSize={nodeSize} {layerHeight} {width}/>

    </div>
{/if}

<style>
    .Tree {
        overflow: scroll;
        display: block;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        position: relative;
        height: var(--height);
        width: var(--width);
        border: 2px solid rgba(0, 0, 0, 0.5);
        margin: 0;
        padding: 0;
        padding-top: var(--topPadding);
        box-sizing: content-box;
    }
</style>