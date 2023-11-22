<template>
  <cl-crud ref="Crud">
    <el-row>
      <!-- 更新按鈕 -->
      <cl-refresh-btn />
    </el-row>

    <el-row>
      <!-- 數據表格 -->
      <cl-table :auto-height="false" ref="Table" row-key="id" @row-click="onRowClick" />
    </el-row>

    <el-row>
      <cl-flex1 />
      <!-- 分頁控件 -->
      <!-- <cl-pagination /> -->
    </el-row>
  </cl-crud>
</template>

<script lang="ts">
import { useCrud, useTable } from "@cool-vue/crud";
import { defineComponent } from "vue";
import { useCool } from "/@/cool";

export default defineComponent({
  name: "news-like-list",
  props: {
    articleId: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const { service } = useCool();

    // cl-table 配置
    const Table = useTable({
      columns: [
        { label: "ID", prop: "id", minWidth: 80 },
        { label: "用戶ID", prop: "userId", align: "left", minWidth: 300 },
        { label: "用戶名稱", prop: "name", minWidth: 150 },
        { label: "瀏覽時間", prop: "createTime", minWidth: 200 },
        { type: "op", buttons: ["edit", "delete"] }
      ]
    });

    // 行點擊展開
    function onRowClick(row: any, column: any) {
      if (column?.property && row.children) {
        Table.value?.toggleRowExpansion(row);
      }
    }

    // cl-crud 配置
    const Crud = useCrud(
      {
        service: service.news.article.likes,
        async onRefresh(params, { render }) {
          const { list, pagination } = await service.news.article.likes({
            ...params,
            articleId: props.articleId
          });

          render(list, pagination);
        }
      },
      (app) => {
        app.refresh();
      }
    );

    return {
      Table,
      onRowClick,
      Crud
    };
  }
});
</script>
