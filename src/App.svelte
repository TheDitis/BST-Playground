<script lang="ts">
	import Graph from "./Graph";
	import BST from "./BST";
	import BSTNode from "./BSTNode.svelte"
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

	console.log("DEPTH: ", tree.depth)

	const treeIter = tree.iter("pre")
	// console.log(typeof treeIter)

</script>

<main>
	<h1>Hello {name}!</h1>
	<BSTNode node={tree} size={window.innerWidth}/>
<!--	<h3>{graph.test} {graph.setTest = true} {graph.test}</h3>-->
<!--	<h3>{graph.values}</h3>-->
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	{#each [...treeIter] as v}
		<h3>{v}</h3>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
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