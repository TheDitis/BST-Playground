<script lang="ts">
	import Graph from "./Structures/Graph";
	import BST from "./Structures/BST";
	import Tree from "./Components/Tree.svelte";
	import BSTNode from "./Components/BSTNode.svelte";
	export let name: string;

	// const graph = new Graph([10, 20, 30, 40], [[1], [2], [3], [0]])

	const tree = new BST(10)
	// tree.left = new BST(5)
	// tree.left.left = new BST(2)
	// tree.left.left.left = new BST(1)
	// tree.left.right = new BST(5)
	// tree.right = new BST(15)
	// tree.right.left = new BST(13)
	// tree.right.left.right = new BST(14)
	// tree.right.right = new BST(22)

	tree.insert(5)
	tree.insert(2)
	tree.insert(7)

	tree.insert(15)
	tree.insert(12)
	tree.insert(17)

	// tree.insert(21);
	// tree.insert(22);
	// tree.insert(23);

	console.log("DEPTH: ", tree.depth)

	const treeIter = tree.iter("pre")
	// console.log(typeof treeIter)

</script>

<main>
	<Tree
		tree={tree}
		width={window.innerWidth}
		height={window.innerHeight}
		nodeSize={100}
		layerHeight={200}
	/>
	{#each [...treeIter] as v}
		<h3>{v}</h3>
	{/each}
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