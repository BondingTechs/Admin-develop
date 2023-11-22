<template>
	<el-button @click="open">自定義表單</el-button>

	<cl-form ref="Form">
		<template #slot-crud>
			<cl-crud ref="Crud">
				<el-row>
					<!-- 刷新按鈕 -->
					<cl-refresh-btn />
					<!-- 新增按鈕 -->
					<cl-add-btn />
					<!-- 刪除按鈕 -->
					<cl-multi-delete-btn />
					<cl-flex1 />
					<!-- 關鍵字搜尋 -->
					<cl-search-key />
				</el-row>

				<el-row>
					<!-- 數據表格 -->
					<cl-table ref="Table" />
				</el-row>

				<el-row>
					<cl-flex1 />
					<!-- 分頁控件 -->
					<cl-pagination />
				</el-row>

				<!-- 新增、編輯 -->
				<cl-upsert ref="Upsert" />
			</cl-crud>
		</template>
	</cl-form>
</template>

<script lang="ts" name="菜單名稱" setup>
import { useCrud, useForm, useTable, useUpsert } from "@cool-vue/crud";

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "姓名",
			prop: "name",
			component: {
				name: "el-input"
			}
		},
		{
			label: "創建時間",
			prop: "createTime",
			component: {
				name: "el-date-picker"
			}
		}
	]
});

// cl-table 配置
const Table = useTable({
	autoHeight: false,
	columns: [
		{
			type: "selection"
		},
		{
			label: "姓名",
			prop: "name"
		},
		{
			label: "創建時間",
			prop: "createTime"
		},
		{
			type: "op"
		}
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: "test"
	},
	(app) => {
		app.refresh();
	}
);

const Form = useForm();

function open() {
	Form.value?.open({
		title: "內嵌crud",
		items: [
			{
				label: "",
				props: {
					labelWidth: "0"
				},
				component: {
					name: "slot-crud"
				}
			}
		]
	});
}
</script>
