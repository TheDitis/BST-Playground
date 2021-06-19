<script lang="ts">
    import BST from "../Structures/BST";
    import TreeInfoItem from "./TreeInfoItem.svelte";

    export let tree: BST<any>;
    export let properties: string[][] | string[] = [
        ["isValid", "Valid"], ["isPerfect", "Perfect"], ["isFull", "Full"], ["isBalanced", "Balanced"], ["depth"],
        ["nodeCount"], ["capacity"], ["freeCapacity"]
    ]
    export let height: number = 100;

    const getPropName = (item: string | string[]): string => {
        return Array.isArray(item) ? item[0] : item;
    }

    const getLabel = (item: string | string[]): string | null => {
        return Array.isArray(item) && item.length >= 2 ? item[1] : null
    }

</script>


<div class="TreeInfoBar" style="height: {height}px;">
    <div class="titleRow">
        <h3 class="title">Tree Information</h3>
    </div>
    <div class="contentSection">
        {#each properties as item}
            <TreeInfoItem
                    {tree}
                    property={getPropName(item)}
                    label={getLabel(item)}
            />
        {/each}
    </div>
</div>

<style>
    .TreeInfoBar {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .titleRow {
        width: 100%;
        border: 1px solid gray;
    }

    .title {
        margin: 5px;
    }

    .contentSection {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>