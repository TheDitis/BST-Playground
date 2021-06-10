<script lang="ts">
    import BSTNode from "./BSTNode.svelte";
    import BST from "./BST";

    export let tree: BST<any>;
    export let layerHeight: number = 80;
    export let width: number = 800;

</script>


<!--<canvas width={width} height={tree.depth * layerHeight}>-->
<!--    -->
<!--</canvas>-->


