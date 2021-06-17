<script lang="ts">
    import BST from "../Structures/BST";
    import {tick} from "svelte";
    import {sizes} from "../stores/stores";

    export let tree: BST<any>;
    export let width: number;

    let dragBar: HTMLElement// Element;
    // let barWidth: number = Math.max(window.innerWidth / 4, 300)

    let number: number = 0;

    const insertNumber = () => {
        tree.insert(number)
        tree = tree.copy();
    }

    let inDrag: boolean = false;
    let dragStart: number = 0;
    let dragDelta: number = 0

    const onDragStart = (e) => {
        // e.dataTransfer.setDragImage(dragBar, -99999, -99999);

        dragBar.style.opacity = 0;

        inDrag = true;
        dragStart = e.clientX;
        console.log("drag starting at: ", dragStart)
        // e.preventDefault();
        // e.stopPropagation();
    }

    const onDrag = async (e) => {

        // e.dataTransfer.setDragImage(dragBar, -99999, -99999);
        // e.preventDefault();
        // e.stopPropagation();
        await tick()
        if (inDrag && e.x > 50) {
            console.log(e.clientX)
            dragDelta = e.clientX - dragStart

            sizes.setControlsWidth(e.clientX);
            console.log("in drag! change: ", dragDelta)
        }
    }

    const onDragEnd = (e) => {
        dragBar.style.opacity = 1;
        inDrag = false;
        console.log("done dragging")
    }


</script>


<div class="TreeControls" bind:clientWidth={width} style="--barWidth: {$sizes.controls[0]}px">

    <div class="contentSection">
        <div class="insertSection">
            <input class="input" type="number" bind:value={number}/>
            <button on:click={insertNumber}>Insert</button>
        </div>
    </div>
    <div
            class="dragBar"
            bind:this={dragBar}
            draggable="true"
            on:click={() => {console.log("CLICKED")}}
            on:dragstart={onDragStart}
            on:drag={onDrag}
            on:dragend={onDragEnd}
    ></div>
</div>


<style>
    .TreeControls {
        display: flex;
        position: relative;
        max-width: var(--barWidth);
        width: var(--barWidth);
        z-index: 100;
        border-right: 10px solid rgba(0, 0, 0, 0.5);
        /*box-sizing: border-box;*/
    }

    .dragBar {
        position: absolute;
        right: -10px;
        height: 100%;
        width: 10px;
        user-select: none;
        user-focus: none;
        background: rgba(0, 0, 0, 0.5);
    }

    .contentSection {
        /*height: 100%;*/
    }
</style>