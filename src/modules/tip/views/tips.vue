<template>
  <cl-crud ref="Crud">
    <el-row>
      <!-- 刷新按钮 -->
      <cl-refresh-btn />
      <!-- 新增按钮 -->
      <cl-add-btn />
      <!-- 刪除按钮 -->
      <cl-multi-delete-btn />
      <cl-flex1 />
      <!-- 狀態篩選 -->
      <cl-select :options="dict.get('tipStatus')" prop="status" />
      <!-- 關鍵字搜尋 -->
      <cl-search-key />
    </el-row>

    <el-row>
      <!-- 數據表格 -->
      <cl-table ref="Table">
        <!-- 縮圖 -->
        <template #column-thumbnail="{ scope }">
          <el-avatar shape="square" :size="50" :src="scope.row.thumbnail"></el-avatar>
        </template>

        <!-- 分類 -->
        <template #column-categories="{ scope }">
          <el-tag
            v-for="(category, index) in scope.row.categories?.split(',')"
            :key="index"
            disable-transitions
            size="small"
            effect="dark"
            style="margin: 2px"
            >{{ category }}</el-tag
          >
        </template>
      </cl-table>
    </el-row>

    <el-row>
      <cl-flex1 />
      <!-- 分页控件 -->
      <cl-pagination />
    </el-row>

    <!-- 新增、編輯 -->
    <cl-upsert ref="Upsert" />
  </cl-crud>
</template>

<script lang="ts" name="award-tips" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useDict } from "/$/dict";
import { useCool } from "/@/cool";
import MenuCheck from "/@/modules/industry/views/components/menu-check.vue";

const { dict } = useDict();

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
  items: [
    { label: "標題", prop: "title", required: true, component: { name: "el-input" } },
    {
      label: "描述",
      prop: "content",
      component: {
        name: "el-input",
        props: {
          placeholder: "描述",
          rows: 3,
          type: "textarea"
        }
      },
      required: true
    },
    { label: "縮圖", prop: "thumbnail", component: { name: "cl-upload" } },
    {
      label: "分類",
      prop: "categories",
      required: true,
      component: {
        vm: MenuCheck
      }
    },
    // {
    //   label: "狀態",
    //   prop: "status",
    //   value: dict.get("tipStatus").value.find((e) => e.label === "發布")?.value,
    //   component: {
    //     name: "el-select",
    //     options: dict.get("tipStatus")
    //   },
    //   required: true
    // },
    {
      label: "發布日期",
      prop: "publishDate",
      // hidden: ({ scope }) => {
      //   return scope.status === dict.get("tipStatus").value.find((e) => e.label === "草稿")?.value;
      // },
      component: {
        name: "el-date-picker",
        props: { type: "date", valueFormat: "YYYY-MM-DD", format: "YYYY-MM-DD" }
      }
      // required: true
    }
  ]
});

// cl-table 配置
const Table = useTable({
  columns: [
    { type: "selection" },
    // { label: "ID", prop: "id" },
    { label: "縮圖", prop: "thumbnail", minWidth: 100 },
    { label: "標題", prop: "title", minWidth: 300 },
    { label: "分類", prop: "categories", width: 180 },
    {
      label: "狀態",
      prop: "status",
      width: 80,
      dict: dict.get("tipStatus")
    },
    {
      label: "取得數量",
      prop: "receives",
      width: 60
    },
    {
      label: "收藏數量",
      prop: "collections",
      width: 60
    },
    {
      label: "發布日期",
      prop: "publishDate",
      width: 150,
      component: { name: "cl-date-text", props: { format: "YYYY-MM-DD" } }
    },
    { label: "創建時間", width: 180, prop: "createTime" },
    { label: "更新時間", width: 180, prop: "updateTime" },
    { type: "op", buttons: ["edit", "delete"] }
  ]
});

// cl-crud 配置
const Crud = useCrud(
  {
    service: service.award.tips
  },
  (app) => {
    app.refresh();
  }
);
</script>
