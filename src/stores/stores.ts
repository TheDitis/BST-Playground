import {writable, readable, derived, Writable, Readable} from "svelte/store"


type PageSizeTarget = ("controls" | "main")


interface PageSectionSizingObject {
    main: number[],
    tree: number[],
    controls: number[],
    info: number[]
}

interface PageSizingStore {
    subscribe: Function,
    set: Function,
    setMainHeight: Function,
    setControlsWidth: Function
}

const createSizeStores = (): PageSizingStore => {
    const mainHeight: Writable<number> = writable(
        Math.floor(window.innerHeight * 0.8)
    );
    const controlWidth: Writable<number> = writable(300);

    const pageSizes: Readable<PageSectionSizingObject> = derived(
        [mainHeight, controlWidth],
        ([$mainHeight, $controlWidth]) => ({
            main: [window.innerWidth, $mainHeight],
            tree: [window.innerWidth - $controlWidth, $mainHeight],
            controls: [$controlWidth, $mainHeight],
            info: [window.innerWidth, window.innerHeight - $mainHeight]
        })
    )

    const set = (value: number, label: PageSizeTarget = "controls") => {
        switch (label) {
            case "main":
                mainHeight.set(value);
                break;
            case "controls":
                controlWidth.set(value);
                break;
            default:
                break;
        }
    }

    const setMainHeight = (value: number) => {
        set(value, "main")
    }

    const setControlsWidth = (value: number) => {
        set(value, "controls")
    }

    return {
        subscribe: pageSizes.subscribe,
        set,
        setMainHeight,
        setControlsWidth
    }
}


export const sizes = createSizeStores();