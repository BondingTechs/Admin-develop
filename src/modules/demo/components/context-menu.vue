<template>
	<div class="scope">
		<div class="h">
			<span>cl-context-menu</span>
			右鍵菜單
		</div>
		<div class="c">
			<el-button type="success" @contextmenu.stop.prevent="open">右鍵點擊</el-button>
		</div>
		<div class="f">
			<span class="date">2019/10/23</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ContextMenu } from "@cool-vue/crud";
import { ElMessage } from "element-plus";

function open(e: any) {
	ContextMenu.open(e, {
		list: [
			{
				label: "新增",
				suffixIcon: "el-icon-plus",
				callback(done) {
					ElMessage.info("點擊了新增");
					done();
				}
			},
			{
				label: "編輯",
				suffixIcon: "el-icon-edit",
				callback(done) {
					ElMessage.info("點擊了編輯");
					done();
				}
			},
			{
				label: "刪除",
				suffixIcon: "el-icon-delete"
			},
			{
				label: "二級",
				suffixIcon: "el-icon-right",
				children: [
					{
						label: "文本超出隱藏，有一天晚上",
						ellipsis: true
					},
					{
						label: "禁用",
						disabled: true
					},
					{
						label: "更多",
						callback(done) {
							ElMessage.warning("開發中");
							done();
						}
					}
				]
			}
		]
	});
}
</script>
