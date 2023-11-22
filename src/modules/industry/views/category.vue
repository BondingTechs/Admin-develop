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
      <!-- 關鍵字搜尋 -->
      <cl-search-key />
    </el-row>

    <el-row>
      <!-- 數據表格 -->
      <cl-table ref="Table" row-key="id" :default-expand-all="true" @row-click="onRowClick">
        <!-- 圖標 -->
        <template #column-icon="{ scope }">
          <icon-svg :name="scope.row.icon" size="16px" style="margin-top: 5px" />
        </template>

        <!-- 行新增 -->
        <template #slot-add="{ scope }">
          <el-button
            v-if="!scope.row.parentId"
            plain
            type="success"
            @click="upsertAppend(scope.row)"
            >新增</el-button
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

<script lang="ts" name="industry-category" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";
import MenuCheck from "./components/menu-check.vue";
import IconSelect from "/@/modules/base/views/components/menu/icon.vue";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
  dialog: {
    width: "800px"
  },
  items: [
    { label: "分類名稱", prop: "name", required: true, component: { name: "el-input" } },
    { label: "分類代稱", prop: "slug", required: true, component: { name: "el-input" } },
    {
      label: "分類描述",
      prop: "description",
      component: {
        name: "el-input",
        props: {
          type: "textarea",
          rows: 4,
          placeholder: " "
        }
      }
    },
    {
      label: "上級分類",
      prop: "parentId",
      component: {
        vm: MenuCheck,
        props: {
          showChild: false,
          multiple: false
        }
      }
    },
    {
      prop: "icon",
      label: "分類Icon",
      span: 24,
      hidden: ({ scope }) => scope.type == 2,
      component: {
        vm: IconSelect
      }
    },
    {
      label: "排序號",
      prop: "orderNum",
      component: { name: "el-input-number", props: { min: 0 } }
    }
  ],
  onOpen(data) {
    if (data.deleteTime) {
      data.isDelete = true;
    }
  }
});

// cl-table 配置
const Table = useTable({
  contextMenu: [
    (row) => {
      return {
        label: "新增",
        hidden: row.parentId,
        callback(done) {
          upsertAppend(row);
          done();
        }
      };
    },
    "update",
    "delete",
    (row) => {
      return {
        label: "權限",
        hidden: row.type != 1,
        callback(done) {
          setPermission(row);
          done();
        }
      };
    }
  ],
  columns: [
    {
      prop: "icon",
      label: "圖標",
      width: 80
    },
    {
      prop: "name",
      label: "名稱",
      align: "left",
      width: 250
    },
    {
      prop: "slug",
      label: "代稱",
      align: "left",
      minWidth: 250
    },
    {
      label: "新聞數量",
      prop: "articleCount",
      width: 120
    },
    {
      label: "小知識數量",
      prop: "tipCount",
      width: 120
    },
    {
      prop: "orderNum",
      label: "排序號",
      sortable: "asc",
      width: 100
    },
    {
      prop: "updateTime",
      label: "更新時間",
      width: 160
    },
    {
      label: "操作",
      type: "op",
      width: 250,
      buttons: ["slot-add", "edit", "delete"]
    }
  ]
});

// cl-crud 配置
const Crud = useCrud(
  {
    service: service.industry.category,
    onRefresh(_, { render }) {
      service.industry.category.list().then((list: any[]) => {
        render(
          deepTree(
            list.map((e: any) => {
              e.isDelete = Boolean(e.deleteTime);
              return e;
            })
          )
        );
      });
    }
  },
  (app) => {
    app.refresh();
  }
);

// 行點擊展開
function onRowClick(row: any, column: any) {
  if (column?.property && row.children) {
    Table.value?.toggleRowExpansion(row);
  }
}

// 子集新增
function upsertAppend({ id }: any) {
  console.log(id);
  Crud.value?.rowAppend({
    parentId: id,
    keepAlive: true,
    isShow: true
  });
}

// 設置權限
function setPermission({ id }: any) {
  Crud.value?.rowAppend({
    parentId: id,
    type: 2
  });
}
</script>
