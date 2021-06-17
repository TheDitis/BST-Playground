<script lang="ts">
    import {sizes} from "../stores/stores";

    // @ts-ignore
    import Icon from "fa-svelte";
    import {faGripHorizontal, faGripVertical, faGripLinesVertical, faGripLines} from "@fortawesome/free-solid-svg-icons";

    type PageSizeTarget = ("controls" | "main")
    type SideIndicatorString = ( "left" | "right" | "top" | "bottom" );

    export let side: SideIndicatorString = "right";
    export let targetName: PageSizeTarget = "controls";
    export let min: number = 200;
    export let max: number = window.innerWidth;
    export let offset: boolean = true;

    let dragBarElement: HTMLElement;

    const setSize = {
        "controls": sizes.setControlsWidth,
        "main": sizes.setMainHeight
    }

    const orientationMap = {
        top: "horizontal",
        bottom: "horizontal",
        left: "vertical",
        right: "vertical"
    }

    const directionalParams = {
        horizontal: {
            dimensions: {
                height: "10px",
                width: "100%"
            },
            coord: "y",
            icon: faGripLines
        },
        vertical: {
            dimensions: {
                height: "100%",
                width: "10px"
            },
            coord: "x",
            icon: faGripLinesVertical
        }
    }

    const orientation = orientationMap[side];
    const sideDistance = offset ? "-10px" : "0"
    const {dimensions, coord, icon} = directionalParams[orientation];

    const sizingMap = {
        "top": directionalParams.horizontal.dimensions,
        "bottom": directionalParams.horizontal.dimensions,
        "left": directionalParams.vertical.dimensions,
        "right": directionalParams.vertical.dimensions
    }

    const onDragStart = (e) => {
        dragBarElement.style.opacity = "0"
    }

    const onDrag = (e) => {
        const position = e[coord];
        if (position > min && position < max) {
            setSize[targetName](position);
        }
    }

    const onDragEnd = (e) => { dragBarElement.style.opacity = "1" }

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
    <Icon {icon}/>
</div>


<style>
    .DragResizeBar {
        position: absolute;
        user-select: none;
        user-focus: none;
        background: rgba(35, 35, 35, 1);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        color: rgba(255, 255, 255, 0.5)
    }
</style>