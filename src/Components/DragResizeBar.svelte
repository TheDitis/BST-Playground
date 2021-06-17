<script lang="ts">
    import {sizes} from "../stores/stores";

    type PageSizeTarget = ("controls" | "main")
    type SideIndicatorString = ( "left" | "right" | "top" | "bottom" );

    export let side: SideIndicatorString = "right";
    export let targetName: PageSizeTarget = "controls";
    export let min: number = 200;
    export let max: number = window.innerWidth;
    export let offset: boolean = true;

    let dragBarElement: HTMLElement;
    let inDrag: boolean = false;
    let dragStart: number = 0;
    let dragDelta: number = 0;

    const setSize = {
        "controls": sizes.setControlsWidth,
        "main": sizes.setMainHeight
    }

    const coordinateMap = {
        "left" : "x",
        "right": "x",
        "top": "y",
        "bottom": "y"
    }

    const dimensionsByDirection = {
        horizontal: {
            height: "10px",
            width: "100%"
        },
        vertical: {
            height: "100%",
            width: "10px"
        }
    }

    // const adjustWidth = (e) => {
    //
    // }

    const sizingMap = {
        "top": dimensionsByDirection.horizontal,
        "bottom": dimensionsByDirection.horizontal,
        "left": dimensionsByDirection.vertical,
        "right": dimensionsByDirection.vertical
    }

    const onDragStart = (e) => {
        dragBarElement.style.opacity = "0";
        inDrag = true;
        dragStart = e[coordinateMap[side]];
    }

    const onDrag = async (e) => {
        const position = e[coordinateMap[side]]
        if (inDrag && position > min && position < max) {
            dragDelta = position - dragStart;
            setSize[targetName](position);
        }
    }

    const onDragEnd = (e) => {
        dragBarElement.style.opacity = "1";
        inDrag = false;
    }

    const sideDistance = offset ? "-10px" : "0"

</script>


<div
        class="DragResizeBar"
        bind:this={dragBarElement}
        style="
            {side}: {sideDistance};
            width: {sizingMap[side].width};
            height: {sizingMap[side].height};
        "
        draggable="true"
        on:dragstart={onDragStart}
        on:drag={onDrag}
        on:dragend={onDragEnd}
>

</div>


<style>
    .DragResizeBar {
        position: absolute;
        /*right: -10px;*/
        /*height: 100%;*/
        /*width: 10px;*/
        user-select: none;
        user-focus: none;
        background: rgba(35, 35, 35, 1);
        z-index: 1000;
    }
</style>