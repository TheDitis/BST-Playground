<script lang="ts">
    import BSTNode from "./BSTNode.svelte";
    import BST from "../Structures/BST";

    export let tree: BST<any>;
    export let width: number = 800;
    export let height: number | null = null;
    export let layerHeight: number = 100;
    export let nodeSize: number = 60;

    // const n_layers: number = tree.depth
    if (height !== null) {
        layerHeight = height / tree.depth
    }

</script>


<!--<canvas width={width} height={tree.depth * layerHeight}>-->
<!--    -->
<!--</canvas>-->


<div class="Tree" style="--height: {layerHeight * tree.depth}px; --width: {width}px;">
    <BSTNode node={tree} size={nodeSize} {layerHeight} {width}/>
</div>

<style>
    .Tree {
        position: relative;
        height: var(--height);
        width: var(--width);
        border: 2px solid rgba(0, 0, 0, 0.5);
        margin: 0;
        box-sizing: border-box;
    }
</style>