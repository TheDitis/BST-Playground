<script lang="ts">
    import BST from "../Structures/BST";
    import BSTBranchSet from "./BSTBranchSet.svelte";

    export let node: BST<any>;
    export let width: number = 500;
    export let nodeSize: number = 60;
    export let layer: number = 1;
    export let layerHeight: number = 80;

    console.log(layerHeight)


</script>




<div class="BSTNode" style="--layerHeight: {node.hasChildren ? layerHeight : nodeSize}px">

    <div class="selfSection">
        <div class="node" style="--nodeSize: {nodeSize}">
            <h1>{node.value}</h1>
        </div>

        {#if node.hasChildren}
            <BSTBranchSet {width} height={layerHeight - nodeSize} left={node.hasLeftChild} right={node.hasRightChild}/>
        {/if}
    </div>


    <div class="childrenSection">
        <div class="child">
            {#if node.hasLeftChild}
                <svelte:self
                    node={node.left}
                    {nodeSize}
                    layer={layer + 1}
                    {layerHeight}
                    width={width / 2}
                />
            {/if}
        </div>
        <div class="child">
            {#if node.hasRightChild}
                <svelte:self
                    node={node.right}
                    {nodeSize}
                    layer={layer + 1}
                    {layerHeight}
                    width={width / 2}
                />
            {/if}
        </div>
    </div>
</div>

<style>
    .BSTNode {
        position: relative;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        width: 100%;
    }

    .selfSection {
        top: 0;
        height: var(--layerHeight);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
    }

    .node {
        width: calc(var(--nodeSize) * 1px);
        height: calc(var(--nodeSize) * 1px);
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

    .childrenSection {
        display: flex;
        width: 100%;
    }

    .child {
        width: 50%;
        margin: 0;
        padding: 0;
    }
</style>