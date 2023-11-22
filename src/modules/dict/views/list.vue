<template>
  <cl-view-group :title="title">
    <template #left>
      <dict-group />
    </template>

    <template #right>
      <cl-crud ref="Crud">
        <el-row>
          <!-- 刷新按鈕 -->
          <cl-refresh-btn />
          <!-- 新增按鈕 -->
          <cl-add-btn :disabled="!group" />
          <cl-flex1 />
          <!-- 關鍵字搜尋 -->
          <cl-search-key />
        </el-row>

        <el-row>
          <!-- 數據表格 -->
          <cl-table
            ref="Table"
            :default-sort="{
              prop: 'orderNum',
              order: 'ascending'
            }"
            row-key="id"
            @row-click="onRowClick"
          >
            <template #slot-btn="{ scope }">
              <el-button
                text
                bg
                type="success"
                v-permission="service.dict.info.permission.add"
                @click="append(scope.row)"
                >新增</el-button
              >
            </template>
          </cl-table>
        </el-row>

        <el-row>
          <cl-flex1 />
        </el-row>

        <!-- 新增、編輯 -->
        <cl-upsert ref="Upsert" />
      </cl-crud>
    </template>
  </cl-view-group>
</template>

<script lang="ts" name="dict-list" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import DictGroup from "../components/group.vue";
import { computed, provide, ref } from "vue";
import { deepTree } from "/@/cool/utils";
import { cloneDeep } from "lodash-es";

const { service } = useCool();

// 組
const group = ref();

// 標題
const title = computed(() => {
  return group.value ? `字典列表（${group.value.name}）` : "字典列表";
});

// cl-upsert 配置
const Upsert = useUpsert({
  dialog: {
    width: "600px"
  },
  props: {
    labelWidth: "100px"
  },
  items: [
    {
      label: "上級節點",
      prop: "parentId",
      component: {
        name: "el-tree-select",
        props: {
          data: computed(() => {
            const data = cloneDeep(Table.value?.data);

            function deep(d: any, f: boolean) {
              if (d.id && d.id == Upsert.value?.getForm("id")) {
                f = true;
              }

              if (f) {
                d.disabled = true;
              }

              if (d.children) {
                d.children.forEach((e: any) => {
                  deep(e, f);
                });
              }
            }

            deep({ children: data }, false);

            return data;
          }),
          props: {
            label: "name",
            value: "id",
            children: "children",
            disabled: "disabled"
          },
          clearable: true,
          filterable: true,
          "default-expand-all": true,
          "check-strictly": true
        }
      }
    },
    {
      label: "名稱",
      prop: "name",
      required: true,
      component: { name: "el-input" }
    },
    {
      label: "類型",
      prop: "type",
      component: {
        name: "el-select",
        options: [
          { label: "一般", value: null },
          { label: "灰階", value: "info" },
          { label: "警告", value: "warning" },
          { label: "危險", value: "danger" },
          { label: "成功", value: "success" }
        ]
      }
    },
    {
      label: "排序",
      prop: "orderNum",
      value: 1,
      component: { name: "el-input-number", props: { min: 1 } }
    },
    {
      label: "備註",
      prop: "remark",
      component: { name: "el-input", props: { type: "textarea", rows: 4 } }
    }
  ],
  onSubmit(data, { next }) {
    next({
      ...data,
      typeId: group.value.id
    });
  }
});

// cl-table 配置
const Table = useTable({
  contextMenu: [
    "refresh",
    (row) => {
      return {
        label: "新增",
        hidden: !service.dict.info._permission?.add,
        callback(done) {
          append(row);
          done();
        }
      };
    },
    "edit",
    "delete",
    "order-asc",
    "order-desc"
  ],
  columns: [
    {
      type: "selection",
      width: 60
    },
    {
      label: "ID",
      prop: "id",
      width: 60
    },
    {
      label: "類型",
      prop: "type",
      minWidth: 100,
      dict: [
        {
          label: "一般",
          value: null
        },
        {
          label: "灰階",
          value: "info",
          type: "info"
        },
        {
          label: "警告",
          value: "warning",
          type: "warning"
        },
        {
          label: "危險",
          value: "danger",
          type: "danger"
        },
        {
          label: "成功",
          value: "success",
          type: "success"
        }
      ]
    },
    { label: "名稱", prop: "name", align: "left", minWidth: 200 },
    { label: "排序", prop: "orderNum", sortable: "custom", width: 100 },
    { label: "備註", prop: "remark", showOverflowTooltip: true, minWidth: 150 },
    { label: "創建時間", prop: "createTime", sortable: "custom", minWidth: 160 },
    { label: "更新時間", prop: "updateTime", sortable: "custom", minWidth: 160 },
    {
      type: "op",
      width: 250,
      buttons: ["slot-btn", "edit", "delete"]
    }
  ]
});

// cl-crud 配置
const Crud = useCrud({
  service: service.dict.info,
  onRefresh(params, { render }) {
    service.dict.info
      .list({
        typeId: group.value?.id,
        ...params,
        page: undefined,
        size: undefined
      })
      .then((res) => {
        render(deepTree(res));
      });
  }
});

// 刷新
function refresh(params?: any) {
  Crud.value?.refresh(params);
}

// 設置組
function setGroup(data: any) {
  group.value = data;
}

// 行點擊展開
function onRowClick(row: any, column: any) {
  if (column?.property && row.children) {
    Table.value?.toggleRowExpansion(row);
  }
}

// 追加子集
function append(row: any) {
  Crud.value?.rowAppend({
    parentId: row.id,
    orderNum: 1
  });
}

provide("dict", {
  group,
  refresh,
  setGroup
});
</script>
