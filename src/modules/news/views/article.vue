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
      <el-select style="margin-right: 10px" v-model="categoryFilter" clearable placeholder="請選擇">
        <el-option-group v-for="group in categoriesSelect" :key="group.value" :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            <span>{{ item.label }}</span>
          </el-option>
        </el-option-group>
      </el-select>
      <cl-select
        v-model="typeFilter"
        style="margin-right: 10px"
        :options="dict.get('articleType')"
        prop="type"
      />
      <cl-select v-model="statusFilter" :options="dict.get('articleStatus')" prop="status" />
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

        <!-- 文章類型 -->
        <template #column-type="{ scope }">
          <el-tag
            disable-transitions
            size="small"
            effect="dark"
            style="margin: 2px; cursor: pointer"
            @click="typeFilter = scope.row.type"
            >{{ getType(scope.row.type) }}</el-tag
          >
        </template>

        <!-- 留言數量 -->
        <template #column-commentCount="{ scope }">
          <el-button text @click="openCommentDialog(scope.row)">{{
            scope.row.commentCount
          }}</el-button>
        </template>

        <!-- 閱讀數量 -->
        <template #column-viewCount="{ scope }">
          <el-button text @click="openViewDialog(scope.row)">{{ scope.row.viewCount }}</el-button>
        </template>

        <!-- 點讚數量 -->
        <template #column-likeCount="{ scope }">
          <el-button text @click="openLikeDialog(scope.row)">{{ scope.row.likeCount }}</el-button>
        </template>

        <!-- 收藏數量 -->
        <template #column-collectionCount="{ scope }">
          <el-button text @click="openCollectionDialog(scope.row)">{{
            scope.row.collectionCount
          }}</el-button>
        </template>

        <!-- 分類 -->
        <template #column-categories="{ scope }">
          <el-tag
            v-for="(category, index) in scope.row.categories"
            :key="index"
            disable-transitions
            size="small"
            effect="dark"
            style="margin: 2px; cursor: pointer"
            @click="categoryFilter = category"
            >{{ categories.find((e) => e.id === category)?.name }}</el-tag
          >
        </template>

        <!-- 評論 -->
        <template #slot-comment="{ scope }">
          <el-button type="success" class="is-has-bg is-text" @click="openCommentDialog(scope.row)"
            >評論</el-button
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

    <!-- 評論彈窗 -->
    <cl-dialog :title="commentTitle" width="90%" height="100%" v-model="commentVisible">
      <comment-list
        @close="commentVisible = false"
        :visible="commentVisible"
        :article-id="commentActiveId"
      />
    </cl-dialog>

    <!-- 閱讀彈窗 -->
    <cl-dialog :title="viewTitle" width="90%" height="100%" v-model="viewVisible">
      <view-list @close="viewVisible = false" :visible="viewVisible" :article-id="viewActiveId" />
    </cl-dialog>

    <!-- 點讚彈窗 -->
    <cl-dialog :title="likeTitle" width="90%" height="100%" v-model="likeVisible">
      <like-list @close="likeVisible = false" :visible="likeVisible" :article-id="likeActiveId" />
    </cl-dialog>

    <!-- 收藏彈窗 -->
    <cl-dialog :title="collectionTitle" width="90%" height="100%" v-model="collectionVisible">
      <collection-list
        @close="collectionVisible = false"
        :visible="collectionVisible"
        :article-id="collectionActiveId"
      />
    </cl-dialog>
  </cl-crud>
</template>

<script lang="ts" name="news-article" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { ElMessage } from "element-plus";
import { add } from "lodash";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CollectionList from "./components/collection-list.vue";
import commentList from "./components/comment-list.vue";
import LikeList from "./components/like-list.vue";
import ViewList from "./components/view-list.vue";
import { useDict } from "/$/dict";
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";
import MenuCheck from "/@/modules/industry/views/components/menu-check.vue";

const route = useRoute();
const router = useRouter();

const { service } = useCool();

const { dict } = useDict();

const typeNormal = dict.get("articleType").value.find((e: any) => e.label === "一般新聞")?.value;
const videoType = dict.get("articleType").value.find((e: any) => e.label === "影音新聞")?.value;

// cl-upsert 配置
const Upsert = useUpsert({
  dialog: {
    fullscreen: true
  },
  items: [
    // select type
    {
      label: "類型",
      prop: "type",
      value: typeNormal,
      component: {
        name: "el-select",
        options: dict.get("articleType")
      },
      required: true
    },
    // main
    {
      label: "標題",
      prop: "title",
      required: true,
      component: { name: "el-input" }
    },
    {
      label: "代稱",
      prop: "slug",
      required: true,
      component: { name: "el-input" }
    },
    {
      label: "影片網址",
      prop: "videoUrl",
      component: { name: "el-input" },
      hidden: ({ scope }) => {
        return scope.type !== videoType;
      }
    },
    {
      label: "完整文章",
      prop: "content",
      component: { name: "cl-editor-wang" },
      required: true
    },
    {
      label: "預覽內容",
      prop: "contentPreview",
      required: true,
      component: { name: "cl-editor-wang" }
    },
    {
      label: "摘錄",
      prop: "excerpt",
      component: {
        name: "el-input",
        props: {
          type: "textarea",
          rows: 4
        }
      }
    },

    // seo
    { label: "meta標題", prop: "metaTitle", component: { name: "el-input" } },
    {
      label: "meta描述",
      prop: "metaDescription",
      component: { name: "el-input", props: { type: "textarea", rows: 4 } }
    },

    // author
    { label: "作者頭像", prop: "authorAvatar", component: { name: "cl-upload" } },
    { label: "作者姓名", prop: "authorName", required: true, component: { name: "el-input" } },
    {
      label: "作者簡介",
      prop: "authorIntro",
      component: { name: "cl-editor-wang", props: { height: 250 } }
    },

    // sidebar
    { label: "縮圖", prop: "thumbnail", component: { name: "cl-upload" } },
    // { label: "縮圖", prop: "thumbnail", component: { name: "el-input" } },
    {
      label: "分類",
      prop: "categories",
      required: true,
      component: {
        vm: MenuCheck
      }
    },
    {
      label: "開啟評論",
      prop: "commentOpen",
      required: true,
      component: { name: "el-switch", default: 0 }
    },
    {
      label: "置頂新聞",
      prop: "isTop",
      required: true,
      component: { name: "el-switch", default: 0 }
    },
    {
      label: "熱門新聞",
      prop: "isHot",
      required: true,
      component: { name: "el-switch", default: 0 }
    },
    {
      label: "狀態",
      prop: "status",
      component: {
        name: "el-select",
        options: dict.get("articleStatus")
      },
      required: true
    },
    {
      label: "發布時間",
      prop: "publishTime",
      component: {
        name: "el-date-picker",
        props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" }
      }
    }
  ]
});

// cl-table 配置
const Table = useTable({
  columns: [
    { type: "selection" },
    {
      label: "類型",
      prop: "type",
      minWidth: 100,
      dict: dict.get("articleType")
    },
    {
      label: "焦點",
      prop: "isTop",
      component: { name: "cl-switch" },
      minWidth: 110
    },
    {
      label: "熱門",
      prop: "isHot",
      component: { name: "cl-switch" },
      minWidth: 110
    },
    { label: "縮圖", prop: "thumbnail", minWidth: 100 },
    {
      label: "狀態",
      prop: "status",
      minWidth: 130,
      dict: dict.get("articleStatus")
    },
    { label: "標題", prop: "title", minWidth: 300, align: "left" },
    { label: "分類", prop: "categories", minWidth: 150 },
    { label: "作者", prop: "authorName", minWidth: 130 },
    { label: "評論", prop: "commentCount", minWidth: 100 },
    { label: "閱讀", prop: "viewCount", minWidth: 100 },
    { label: "按讚", prop: "likeCount", minWidth: 100 },
    { label: "收藏", prop: "collectionCount", minWidth: 100 },
    {
      label: "評論開啟",
      prop: "commentOpen",
      component: { name: "cl-switch" },
      minWidth: 110
    },
    { label: "發布時間", prop: "publishTime", sortable: "custom", minWidth: 200 },
    { label: "創建時間", prop: "createTime", sortable: "custom", minWidth: 200 },
    { label: "更新時間", prop: "updateTime", sortable: "custom", minWidth: 200 },
    { type: "op", buttons: ["slot-comment", "edit", "delete"], width: 250 }
  ]
});

// 評論
const commentVisible = ref(false);
const commentActiveId = ref(0);
const commentTitle = ref("");

function openCommentDialog({ id }: any) {
  const { title } = Table.value?.data.find((item) => item.id === id);
  commentTitle.value = title;
  commentVisible.value = true;
  commentActiveId.value = id;
}

// 閱讀
const viewVisible = ref(false);
const viewActiveId = ref(0);
const viewTitle = ref("");

function openViewDialog({ id }: any) {
  const { title } = Table.value?.data.find((item) => item.id === id);
  viewTitle.value = title;
  viewVisible.value = true;
  viewActiveId.value = id;
}

// 點讚
const likeVisible = ref(false);
const likeActiveId = ref(0);
const likeTitle = ref("");

function openLikeDialog({ id }: any) {
  const { title } = Table.value?.data.find((item) => item.id === id);
  likeTitle.value = title;
  likeVisible.value = true;
  likeActiveId.value = id;
}

// 收藏
const collectionVisible = ref(false);
const collectionActiveId = ref(0);
const collectionTitle = ref("");

function openCollectionDialog({ id }: any) {
  console.log("openCollectionDialog");
  const { title } = Table.value?.data.find((item) => item.id === id);
  collectionTitle.value = title;
  collectionVisible.value = true;
  collectionActiveId.value = id;
}

// 分類篩選
const categoryFilter = ref("");
const categories = ref<any>([]);
const categoriesSelect = ref<any[]>([]);

const getCategoryFilter = () => {
  service.industry.category
    .list({
      type: "article"
    })
    .then((res: any[]) => {
      categories.value = res;
      categoriesSelect.value = res.filter((e) => e.articleCount !== "0" || !e.parentId);
      categoriesSelect.value = deepTree(categoriesSelect.value);
      categoriesSelect.value = categoriesSelect.value.map((parent) => {
        parent.children = parent.children ?? [];
        const children = parent.children.map((child: any) => {
          return {
            label: child.name,
            value: child.id,
            parentId: child.parentId
          };
        });
        const parentCount = parent.children.reduce(
          (a: any, b: any) => add(a.articleCount, b.articleCount),
          0
        );
        return {
          label: parent.name,
          options: [
            {
              label: "全部",
              value: parent.id,
              disabled: parentCount === 0,
              parentId: null
            },
            ...children
          ]
        };
      });
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
};

onMounted(() => {
  getCategoryFilter();
});

// 其他篩選
const typeFilter: any = ref(null);
const statusFilter: any = ref(null);

onMounted(() => {
  const keys: any = {
    type: typeFilter,
    status: statusFilter,
    categoryId: categoryFilter,
    categoryParentId: categoryFilter
  };
  const routeKeys = Object.keys(route.query);
  routeKeys.forEach((e: any) => {
    if (keys[e]) {
      keys[e].value = Number(route.query[e]) || route.query[e];
      console.log(e, keys[e], route.query[e]);
    }
  });
});

const crudLoading = ref(true);

// cl-crud 配置
const Crud = useCrud(
  {
    service: service.news.article,
    async onRefresh(params, { render }) {
      if (Object.keys(route.query).length > 0 && crudLoading.value) {
        params = route.query;
      }
      crudLoading.value = false;

      const categoryId = categoryFilter.value;
      const categoryIsParent = categories.value.find(
        (e: any) => !e.parentId && e.id === categoryId
      );
      const categoryParam = categoryIsParent ? { categoryParentId: categoryId } : { categoryId };
      params = categoryId ? { ...params, ...categoryParam } : params;

      router.replace({ path: route.path, query: params });

      service.news.article.page(params).then((res) => {
        const { list, pagination } = res;
        list.forEach((e: any) => {
          if (e.categories) {
            e.categories = e.categories.split(",").map(Number);
          } else {
            e.categories = [];
          }
          e.isHot = Boolean(e.isHot);
          e.isTop = Boolean(e.isTop);
          e.commentOpen = Boolean(e.commentOpen);
        });

        render(list, pagination);
      });
    }
  },
  (app) => {
    app.refresh();
  }
);

watch(categoryFilter, () => {
  Crud.value?.refresh();
});

// 載入路由參數
onMounted(() => {
  console.log(Crud.value);
});

// 抓取分類
const getType = (id: number) => {
  const types = dict.get("articleType").value;
  if (types.length) {
    return types.find((e: any) => e.value === id)?.label;
  }
};
</script>
