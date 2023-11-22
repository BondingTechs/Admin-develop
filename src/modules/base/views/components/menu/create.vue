<template>
	<el-button type="success" @click="create">快速創建</el-button>
	<cl-form ref="Form">
		<template #slot-entity="{ scope }">
			<el-cascader
				v-model="scope.entity"
				filterable
				separator="."
				:options="tree"
				@change="onEntityChange"
			></el-cascader>
		</template>
	</cl-form>
</template>

<script lang="ts" name="menu-create" setup>
import { isEmpty } from "lodash-es";
import { ElMessage } from "element-plus";
import { useCool } from "/@/cool";
import { useForm } from "@cool-vue/crud";
import MenuSelect from "./select.vue";
import IconSelect from "./icon.vue";
import { deepPaths } from "/@/cool/utils";
import { ref } from "vue";

const { service } = useCool();
const Form = useForm();

// 實體列表
const list: any[] = [];

// 實體樹形列表
const tree = ref();

// 快速創建
async function create() {
	// 模塊列表
	const modules: string[] = await service.request({
		url: "/__cool_modules",
		proxy: false
	});

	// 數據結構列表
	const eps: any[][] = await service.base.open.eps();

	for (const i in eps) {
		eps[i].forEach((e) => {
			if (!isEmpty(e.columns)) {
				list.push({
					value: e.prefix.substring(7),
					...e
				});
			}
		});
	}

	// 實體樹形列表
	tree.value = deepPaths(list.map((e) => e.value));

	// 打開
	Form.value?.open({
		title: "快速創建",
		width: "800px",
		items: [
			{
				prop: "module",
				label: "選擇模塊",
				span: 10,
				component: {
					name: "el-select",
					props: {
						filterable: true,
						clearable: true,
						placeholder: "請選擇模塊"
					},
					options: modules.map((e) => {
						return {
							label: e,
							value: e
						};
					})
				},
				required: true
			},
			{
				prop: "entity",
				label: "數據結構",
				span: 14,
				component: {
					name: "slot-entity"
				},
				required: true
			},
			{
				prop: "name",
				label: "菜單名稱",
				span: 10,
				component: {
					name: "el-input",
					props: {
						placeholder: "請輸入菜單名稱"
					}
				},
				required: true
			},
			{
				prop: "router",
				label: "菜單路由",
				span: 14,
				component: {
					name: "el-input",
					props: {
						placeholder: "請輸入菜單路由，如：/test"
					}
				}
			},
			{
				prop: "parentId",
				label: "上級節點",
				component: {
					vm: MenuSelect,
					props: {
						type: 1
					}
				}
			},
			{
				prop: "keepAlive",
				value: true,
				label: "路由緩存",
				component: {
					name: "el-radio-group",
					options: [
						{
							label: "開啟",
							value: true
						},
						{
							label: "關閉",
							value: false
						}
					]
				}
			},
			{
				prop: "icon",
				label: "菜單圖標",
				component: {
					vm: IconSelect
				}
			},
			{
				prop: "orderNum",
				label: "排序號",
				component: {
					name: "el-input-number",
					props: {
						placeholder: "請填寫排序號",
						min: 0,
						max: 99,
						"controls-position": "right"
					}
				}
			}
		],
		on: {
			submit(data: any, { done, close }: any) {
				// 選擇的數據結構
				const item = list.find((e) => e.value == data.entity.join("/"));

				// 分割、刪除前綴
				const arr = item.prefix.replace("/admin/", "").split("/");

				// 替換模塊名
				arr[0] = data.module;

				// 添加目錄
				arr.splice(1, 0, "views");

				// 文件路徑
				item.filePath = arr.join("/") + ".vue";

				// 插入菜單
				service.base.sys.menu
					.add({
						type: 1,
						isShow: true,
						viewPath: `modules/${item.filePath}`,
						...data
					})
					.then((res) => {
						// 權限列表
						const perms: any[] = [];

						item.api.forEach((e: any) => {
							const d: any = {
								type: 2,
								parentId: res.id,
								name: e.summary || e.path,
								perms: [e.path]
							};

							if (e.path == "/update") {
								if (item.api.find((a: any) => a.path == "/info")) {
									d.perms.push("/info");
								}
							}

							d.perms = d.perms
								.map((e: string) =>
									(item.prefix.replace("/admin/", "") + e).replace(/\//g, ":")
								)
								.join(",");

							perms.push(d);
						});

						// 批量插入權限
						service.base.sys.menu.add(perms).then(() => {
							close();

							service.request({
								url: "/__cool_createMenu",
								proxy: false,
								method: "POST",
								data: {
									...item,
									...data
								}
							});
						});
					})
					.catch((err) => {
						ElMessage.error(err.message);
						done();
					});
			}
		}
	});
}

// 實體切換
function onEntityChange(arr: string[]) {
	const item = list.find((e) => e.value == arr.join("/"));

	if (item) {
		Form.value?.setForm("router", `/${item.value}`);
	}
}
</script>
