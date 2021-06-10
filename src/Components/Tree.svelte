<script lang="ts">
    import BSTNode from "./BSTNode.svelte";
    import BST from "../Structures/BST";

    export let tree: BST<any>;
    export let width: number = 800;
    export let height: number | null = null;
    export let layerHeight: number = 100;
    export let nodeSize: number = 60;

    if (height !== null) {
        // TODO: See if you can make tree a required parameter when at wifi, or handle absence
        layerHeight = height / tree.depth
    }

    console.log("max layer 3: ", tree.maxNodesInLayer(3))
    console.log("max width for tree: ", tree.maxWidth)

</script>


<div class="Tree" style="--height: {layerHeight * tree.depth}px; --width: {width}px;">
    <BSTNode node={tree} size={nodeSize} {layerHeight} {width} x={width / 2}/>
</div>

<style>
    .Tree {
        overflow: scroll;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        position: relative;
        height: var(--height);
        width: var(--width);
        border: 2px solid rgba(0, 0, 0, 0.5);
        margin: 0;
        box-sizing: border-box;
    }
</style>