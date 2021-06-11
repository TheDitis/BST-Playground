<script lang="ts">
    export let width: number;
    export let height: number;

    export let color: string = "rgba(0, 200, 200, 0.7)";

    export let left: boolean = true;
    export let right: boolean = true;
    export let curve: number = 0.6;

    let xMid: number, lEndX: number, curvePX: number;
    $: xMid = width / 2;
    $: lEndX = xMid / 2;
    $: rEndX = xMid + (xMid / 2);

    $: curvePX = height * (curve <= 1 ? curve : curve / 100);

</script>


<svg viewBox="0 0 {width} {height}" width="{width}px" height="{height}px">
    {#if left}
<!--        <line x1={xMid} y1={0} x2={lEndX} y2={height} stroke={color} stroke-width={2}/>-->
        <path
            d="
                M {xMid},{0}
                C {xMid},{curvePX} {lEndX},{height - curvePX} {lEndX},{height}"
            stroke={color}
            stroke-width={2}
            fill="none"
        />
    {/if}
    {#if right}
<!--        <line x1={xMid} y1={0} x2={rEndX} y2={height} stroke={color} stroke-width={2}/>-->
        <path
                d="
                M {xMid},{0}
                C {xMid},{curvePX} {rEndX},{height - curvePX} {rEndX},{height}"
                stroke={color}
                stroke-width={2}
                fill="none"
        />
    {/if}
</svg>