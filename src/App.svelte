<script lang="ts">
	import BST from "./Structures/BST";
	import Tree from "./Components/Tree.svelte";
	export let name: string;

	// const tree = BST.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	const tree = BST.constructFullPerfectTree(4, 10);

	console.log("is balanced? ", tree.isBalanced)
	// console.log(BST.constructFullPerfectTree())
</script>

<main>
	<Tree
		tree={tree}
		width={window.innerWidth}
		height={window.innerHeight}
		nodeSize={100}
		layerHeight={200}
	/>

</main>

<style>
	main {
		text-align: center;
		padding: 0;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>