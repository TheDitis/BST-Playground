<script lang="ts">
    import BST from "../Structures/BST";

    export let tree: BST<any>;
    export let property: string;
    export let label: string | null = null;

    export let size: number = 200;
    export let width: number = size;
    export let height: number = size;

    let result: boolean | number;
    $: result = tree[property];

    const labelFromPropName = (propName: string): string => {
        const first: string = propName[0].toUpperCase();
        const spaced = propName.replace( /([A-Z])/g, " $1" );
        return first + spaced.substr(1);
    }

    $: label = label || labelFromPropName(property);

</script>


<div class="TreeInfoItem">
    <h4 class="label">{label}</h4>
    <h2 class="result">{result}</h2>
</div>


<style>
    .TreeInfoItem {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 30px;
    }

    .label {
        margin: 0;
    }

    .result {
        /*margin: 0;*/
        margin-top: 30px;
    }
</style>