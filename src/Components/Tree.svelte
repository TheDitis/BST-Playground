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
</script>


<div
        class="Tree"
        style="
            --height: {layerHeight * tree.depth}px;
            --width: {width}px;
            --topPadding: {(layerHeight - nodeSize) / 2}
        "
>
    <BSTNode node={tree} nodeSize={nodeSize} {layerHeight} {width}/>

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