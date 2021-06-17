<script lang="ts">
	import BST from "./Structures/BST";
	import Tree from "./Components/Tree.svelte";
	import TreeInfoRow from "./Components/TreeInfoBar.svelte";
	import TreeControls from "./Components/TreeControls.svelte";

	import {sizes} from "./stores/stores";
	import {tree} from "./stores/treeStores";
	import DragResizeBar from "./Components/DragResizeBar.svelte";

	// let controlBarWidth;
	// let infoBarHeight;

	console.log("VALUE: ", $tree)

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

	// let preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]

	// let tree = BST.from(preOrderTraversalValues)

	// console.log("bar height: ", infoBarHeight)
	// were passed to Tree
	// width={window.innerWidth}
	// height={window.innerHeight}
</script>

<main>
	<div class="treeAndControlsSection" style="height: {$sizes.main[1]}px">
		<TreeControls bind:tree={$tree}/>
		<Tree
				height={$sizes.info[1]}
				width={$sizes.tree[0]}
				tree={$tree}
				nodeSize={100}
				layerHeight={200}
		/>
		<DragResizeBar
				side="bottom"
				targetName="main"
				offset={true}
				max={window.innerHeight - 180}
		/>
	</div>

	<TreeInfoRow height={$sizes.info[1]} bind:tree={$tree}  />
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0;
		margin: 0;
		width: 100vw;
		box-sizing: border-box;
		text-align: center;
		background: rgba(50, 50, 50, 1);
		color: white;
	}

	.treeAndControlsSection {
		position: relative;
		display: flex;
		z-index: 20;
		border-bottom: 10px solid rgba(42, 42, 42, 1);
		/*flex-direction: column;*/;
		/*height: 90vh;*/
	}
</style>