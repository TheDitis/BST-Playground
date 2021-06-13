<script lang="ts">
	import BST from "./Structures/BST";
	import Tree from "./Components/Tree.svelte";
	import TreeInfoRow from "./Components/TreeInfoRow.svelte";

	export let name: string;

	// let treeObj = {
	// 	"nodes": [
	// 		{"id": "10", "left": "5", "right": "15", "value": 10},
	// 		{"id": "15", "left": "13", "right": "22", "value": 15},
	// 		{"id": "22", "left": null, "right": null, "value": 22},
	// 		{"id": "13", "left": null, "right": "16", "value": 13},
	// 		{"id": "16", "left": null, "right": null, "value": 16},
	// 		{"id": "5", "left": "2", "right": "5-2", "value": 5},
	// 		{"id": "5-2", "left": null, "right": null, "value": 5},
	// 		{"id": "2", "left": "1", "right": null, "value": 2},
	// 		{"id": "1", "left": null, "right": null, "value": 1}
	// 	],
	// 	"root": "10"
	// }

	let preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]

	let tree2 = BST.reconstructFromPreOrder(preOrderTraversalValues);

	let tree = new BST(10);
	tree.left = new BST(4);
	tree.left.left = new BST(2);
	tree.left.left.left = new BST(1);
	tree.left.right = new BST(3);
	tree.right = new BST(17);
	tree.right.right = new BST(19);
	tree.right.right.left = new BST(18);

	console.log("input array: ", preOrderTraversalValues);

	console.log("correct tree inOrder: ", tree.toArray("inorder"));
	console.log("correct tree reverse inOrder: ", tree.toArray("inorder", true));
	console.log("correct tree preOrder: ", tree.toArray("preorder"));
	console.log("correct tree reverse preOrder: ", tree.toArray("preorder", true))

	// const tree = BST.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	// const tree = BST.constructFullPerfectTree(4, 10);
	// const tree = BST.fromObject(treeObj)

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
	<TreeInfoRow {tree}/>
	<div style="width: 100%; display: flex">
		<Tree
				tree={tree}
				width={window.innerWidth / 2}
				height={window.innerHeight}
				nodeSize={100}
				layerHeight={200}
		/>
		<Tree
				tree={tree2}
				width={window.innerWidth / 2}
				height={window.innerHeight}
				nodeSize={100}
				layerHeight={200}
		/>
	</div>
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