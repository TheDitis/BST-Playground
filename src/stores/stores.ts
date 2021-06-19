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
    setControlsWidth: Function,
    setWindowSize: Function
}

const createSizeStores = (): PageSizingStore => {
    const mainHeight: Writable<number> = writable(
        Math.floor(window.innerHeight * 0.8)
    );
    const controlWidth: Writable<number> = writable(300);

    /// MUST BIND THESE TO WINDOW FOR APP TO RESIZE PROPERLY!
    const windowWidth: Writable<number> = writable(window.innerWidth);
    const windowHeight: Writable<number> = writable(window.innerHeight);

    const pageSizes: Readable<PageSectionSizingObject> = derived(
        [mainHeight, controlWidth, windowWidth, windowHeight],
        ([$mainHeight, $controlWidth, $windowWidth, $windowHeight]) => ({
            main: [$windowWidth, $mainHeight],
            tree: [$windowWidth - $controlWidth, $mainHeight],
            controls: [$controlWidth, $mainHeight],
            info: [$windowWidth, $windowHeight - $mainHeight]
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

    const setWindowSize = (
        width: number | null = null,
        height: number | null = null
    ) => {
        if (width !== null) windowWidth.set(width);
        if (height !== null) windowHeight.set(height);
    }

    return {
        subscribe: pageSizes.subscribe,
        set,
        setMainHeight,
        setControlsWidth,
        setWindowSize
    }
}


export const sizes = createSizeStores();