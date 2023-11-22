<template>
  <cl-crud ref="commentCrud">
    <el-row>
      <!-- 更新按鈕 -->
      <cl-refresh-btn />
      <!-- 新增按鈕 -->
      <cl-add-btn />
      <!-- 刪除按鈕 -->
      <cl-multi-delete-btn />
    </el-row>

    <el-row>
      <!-- 數據表格 -->
      <cl-table :auto-height="false" ref="commentTable" row-key="id" @row-click="onRowClick" />
    </el-row>

    <el-row>
      <cl-flex1 />
      <!-- 分頁控件 -->
      <!-- <cl-pagination /> -->
    </el-row>

    <!-- 新增、編輯 -->
    <cl-upsert ref="commentUpsert" />
  </cl-crud>
</template>

<script lang="ts">
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { defineComponent } from "vue";
import _ from "lodash";
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";

export default defineComponent({
  name: "news-comment-list",
  props: {
    articleId: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const { service } = useCool();

    // cl-upsert 配置
    const commentUpsert = useUpsert({
      items: [
        {
          label: "上層評論",
          prop: "parentId",
          component: {
            name: "el-select",
            options: [],
            props: {
              clearable: true,
              filterable: true
            }
          }
        },
        {
          label: "文章ID",
          prop: "articleId",
          value: props.articleId,
          hidden: true,
          component: { name: "el-input" }
        },
        {
          label: "評論者",
          prop: "authorId",
          required: true,
          component: {
            name: "el-select",
            options: [],
            props: {
              clearable: true,
              filterable: true
            }
          }
        },
        {
          label: "內容",
          prop: "content",
          component: {
            name: "el-input",
            props: { type: "textarea", rows: 4 }
          },
          required: true
        },
        {
          label: "狀態",
          prop: "isDelete",
          value: false,
          component: {
            name: "cl-switch",
            props: {
              "active-color": "#ff4949"
            }
          }
        }
      ],
      onOpen: async (data) => {
        console.log(data);
        const userList = await service.base.sys.user.list();
        if (!_.isEmpty(userList)) {
          commentUpsert.value?.setOptions(
            "authorId",
            userList?.map((e: any) => {
              return {
                label: `${e.name} (ID:${e.id})`,
                value: String(e.id)
              };
            })
          );
        }

        const commentList = await service.news.comment.list({
          articleId: props.articleId,
          parent: true
        });

        if (!_.isEmpty(commentList)) {
          commentUpsert.value?.setOptions(
            "parentId",
            commentList.map((e: any) => {
              return {
                label: `${e.id}. ${e.content}`,
                value: String(e.id)
              };
            })
          );
        }
      },

      onInfo: async (data, { next }) => {
        next(data);
      },

      onSubmit(data, { next }) {
        let articleId = props.articleId;

        next({
          ...data,
          articleId
        });
      }
    });

    // cl-table 配置
    const commentTable = useTable({
      columns: [
        { type: "selection" },
        { label: "ID", prop: "id", minWidth: 80 },
        { label: "內容", prop: "content", align: "left", minWidth: 300 },
        { label: "評論者", prop: "author", minWidth: 150 },
        { label: "讚數", prop: "likeCount", minWidth: 100 },
        // { label: "IP地址", prop: "ipAddr", minWidth: 120 },
        {
          label: "狀態",
          prop: "isDelete",
          minWidth: 120,
          dict: [
            {
              label: "正常",
              value: 0,
              type: "success"
            },
            {
              label: "刪除",
              value: 1,
              type: "danger"
            }
          ]
        },
        { label: "創建時間", prop: "createTime", minWidth: 200 },
        { label: "更新時間", prop: "updateTime", minWidth: 200 },
        { label: "刪除時間", prop: "deleteTime", minWidth: 200 },
        { type: "op", buttons: ["edit", "delete"] }
      ]
    });

    // 行點擊展開
    function onRowClick(row: any, column: any) {
      if (column?.property && row.children) {
        commentTable.value?.toggleRowExpansion(row);
      }
    }

    // cl-crud 配置
    const commentCrud = useCrud(
      {
        service: service.news.comment,
        async onRefresh(params, { next, render }) {
          const { list } = await next({ ...params, articleId: props.articleId });
          if (_.isEmpty(list)) {
            return render(list);
          }

          render(
            deepTree(
              list.map((e: any) => {
                e.isDelete = Boolean(e.deleteTime);
                return e;
              })
            )
          );
        }
      },
      (app) => {
        app.refresh();
      }
    );

    return {
      commentUpsert,
      commentTable,
      onRowClick,
      commentCrud
    };
  }
});
</script>
