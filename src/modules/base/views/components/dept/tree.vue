<template>
	<div class="dept-tree">
		<div class="dept-tree__header">
			<div>組織架構</div>

			<ul class="dept-tree__op">
				<li @click="refresh()">
					<el-tooltip content="刷新">
						<el-icon>
							<refresh-icon />
						</el-icon>
					</el-tooltip>
				</li>

				<li v-if="drag && !app.browser.isMini" @click="isDrag = true">
					<el-tooltip content="拖動排序">
						<el-icon>
							<operation />
						</el-icon>
					</el-tooltip>
				</li>

				<li v-show="isDrag" class="no">
					<el-button @click="treeOrder(true)" size="small">保存</el-button>
					<el-button @click="treeOrder(false)" size="small">取消</el-button>
				</li>
			</ul>
		</div>

		<div class="dept-tree__container" @contextmenu.stop.prevent="onContextMenu">
			<el-scrollbar>
				<el-tree
					v-loading="loading"
					node-key="id"
					default-expand-all
					:data="list"
					:props="{
						label: 'name'
					}"
					:draggable="isDrag"
					:allow-drag="allowDrag"
					:allow-drop="allowDrop"
					:expand-on-click-node="false"
					@node-contextmenu="onContextMenu"
				>
					<template #default="{ node, data }">
						<div class="dept-tree__node">
							<span
								class="dept-tree__node-label"
								:class="{
									'is-active': data.id == info?.id
								}"
								@click="rowClick(data)"
								>{{ node.label }}</span
							>
							<span
								v-if="app.browser.isMini"
								class="dept-tree__node-icon"
								@click="onContextMenu($event, data, node)"
							>
								<el-icon>
									<more-filled />
								</el-icon>
							</span>
						</div>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>

		<cl-form ref="Form" />
	</div>
</template>

<script lang="ts" name="dept-tree" setup>
import { inject, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCool } from "/@/cool";
import { deepTree, revDeepTree } from "/@/cool/utils";
import { isArray } from "lodash-es";
import { ContextMenu, useForm } from "@cool-vue/crud";
import { Refresh as RefreshIcon, Operation, MoreFilled } from "@element-plus/icons-vue";
import { useBase, checkPerm } from "/$/base";

const props = defineProps({
	drag: {
		type: Boolean,
		default: true
	},
	level: {
		type: Number,
		default: 99
	}
});

const emit = defineEmits(["list-change", "row-click", "user-add"]);

const { service } = useCool();

const { app } = useBase();

// 樹形列表
const list = ref<any[]>([]);

// 選中
const info = ref();

// 加載中
const loading = ref<boolean>(false);

// 是否能拖動
const isDrag = ref<boolean>(false);

// cl-form
const Form = useForm();

const viewGroup = inject<any>("viewGroup");

// 允許託的規則
function allowDrag({ data }: any) {
	return data.parentId;
}

// 允許放的規則
function allowDrop(_: any, dropNode: any) {
	return dropNode.data.parentId;
}

// 刷新
async function refresh() {
	loading.value = true;
	isDrag.value = false;

	await service.base.sys.department.list().then((res: any[]) => {
		list.value = deepTree(res);

		if (!info.value) {
			info.value = list.value[0];
		}

		// 模擬點擊
		rowClick(info.value);
	});

	loading.value = false;
}

// 獲取 ids
function rowClick(e: any) {
	if (e) {
		const ids = e.children ? revDeepTree(e.children).map((e) => e.id) : [];
		ids.unshift(e.id);
		info.value = e;
		viewGroup.checkExpand(false);
		emit("row-click", { item: e, ids });
	}
}

// 編輯部門
function rowEdit(e: any) {
	const method = e.id ? "update" : "add";

	Form.value?.open({
		title: "編輯部門",
		width: "550px",
		props: {
			labelWidth: "100px"
		},
		items: [
			{
				label: "部門名稱",
				prop: "name",
				component: {
					name: "el-input"
				},
				required: true
			},
			{
				label: "上級部門",
				prop: "parentName",
				component: {
					name: "el-input",
					props: {
						disabled: true
					}
				}
			},
			{
				label: "排序",
				prop: "orderNum",
				component: {
					name: "el-input-number",
					props: {
						"controls-position": "right",
						min: 0,
						max: 100
					}
				}
			}
		],
		form: e,
		on: {
			submit(data, { done, close }) {
				service.base.sys.department[method]({
					id: e.id,
					parentId: e.parentId,
					name: data.name,
					orderNum: data.orderNum
				})
					.then(() => {
						ElMessage.success(`新增部門 “${data.name}” 成功`);
						close();
						refresh();
					})
					.catch((err) => {
						ElMessage.error(err.message);
						done();
					});
			}
		}
	});
}

// 刪除部門
function rowDel(e: any) {
	async function del(f: boolean) {
		await service.base.sys.department
			.delete({
				ids: [e.id],
				deleteUser: f
			})
			.then(() => {
				if (e.id == info.value.id) {
					info.value = null;
				}

				if (f) {
					ElMessage.success("刪除成功");
				} else {
					ElMessageBox.confirm(
						`“${e.name}” 部門的用戶已成功轉移到 “${e.parentName}” 部門。`,
						"刪除成功"
					);
				}
			});

		refresh();
	}

	ElMessageBox.confirm(`該操作會刪除 “${e.name}” 部門的所有用戶，是否確認？`, "提示", {
		type: "warning",
		confirmButtonText: "直接刪除",
		cancelButtonText: "保留用戶",
		distinguishCancelAndClose: true
	})
		.then(() => {
			del(true);
		})
		.catch((action: string) => {
			if (action == "cancel") {
				del(false);
			}
		});
}

// 部門排序
function treeOrder(f: boolean) {
	if (f) {
		ElMessageBox.confirm("部門架構已發生改變，是否保存？", "提示", {
			type: "warning"
		})
			.then(async () => {
				const ids: any[] = [];

				function deep(list: any[], pid: any) {
					list.forEach((e) => {
						e.parentId = pid;
						ids.push(e);

						if (e.children && isArray(e.children)) {
							deep(e.children, e.id);
						}
					});
				}

				deep(list.value, null);

				await service.base.sys.department
					.order(
						ids.map((e, i) => {
							return {
								id: e.id,
								parentId: e.parentId,
								orderNum: i
							};
						})
					)
					.then(() => {
						ElMessage.success("更新排序成功");
					})
					.catch((err) => {
						ElMessage.error(err.message);
					});

				refresh();
				isDrag.value = false;
			})
			.catch(() => null);
	} else {
		refresh();
	}
}

// 右鍵菜單
function onContextMenu(e: any, d?: any, n?: any) {
	if (!d) {
		d = list.value[0] || {};
	}

	// 權限
	const perm = service.base.sys.department.permission;

	ContextMenu.open(e, {
		list: [
			{
				label: "新增",
				hidden: (n && n.level >= props.level) || !checkPerm(perm.add),
				callback(done) {
					rowEdit({
						name: "",
						parentName: d.name,
						parentId: d.id
					});
					done();
				}
			},
			{
				label: "編輯",
				hidden: !checkPerm(perm.update),
				callback(done) {
					rowEdit(d);
					done();
				}
			},
			{
				label: "刪除",
				hidden: !d.parentId || !checkPerm(perm.delete),
				callback(done) {
					rowDel(d);
					done();
				}
			},
			{
				label: "新增成員",
				hidden: !checkPerm(perm.add),
				callback(done) {
					emit("user-add", d);
					done();
				}
			}
		]
	});
}

onMounted(function () {
	refresh();
});
</script>

<style lang="scss" scoped>
.dept-tree {
	height: 100%;
	width: 100%;

	:deep(.el-tree-node__label) {
		display: block;
		height: 100%;
		width: 100%;
	}

	&__header {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 10px;
		letter-spacing: 1px;
		position: relative;

		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}

		i {
			font-size: 18px;
			cursor: pointer;
		}
	}

	&__op {
		display: flex;

		li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			padding: 5px;
			cursor: pointer;

			&:not(.no):hover {
				background-color: #eee;
			}
		}
	}

	&__container {
		height: calc(100% - 40px);

		:deep(.el-tree-node__content) {
			height: 36px;
			margin: 0 5px;
		}
	}

	&__node {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;

		&-label {
			display: flex;
			align-items: center;
			flex: 1;
			height: 100%;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.is-active {
				color: var(--color-primary);
				font-weight: bold;
			}
		}

		&-icon {
			height: 28px;
			width: 28px;
			line-height: 28px;
			text-align: center;
			margin-right: 5px;
		}
	}
}
</style>
