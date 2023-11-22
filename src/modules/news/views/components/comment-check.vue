<template>
  <div class="menu-check__wrap">
    <el-popover
      v-model:visible="visible"
      placement="bottom-start"
      width="660px"
      popper-class="menu-check"
      trigger="click"
    >
      <el-input v-model="keyword" :prefix-icon="Search"> </el-input>

      <div class="menu-check__scroller scroller1">
        <el-tree
          ref="Tree"
          node-key="menuId"
          :data="treeList"
          :props="{
            label: 'name',
            children: 'children'
          }"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expanded-keys="expandedKeys"
          :filter-node-method="filterNode"
          @current-change="onCurrentChange"
        />
      </div>

      <template #reference>
        <el-input v-model="name" readonly placeholder="請選擇" @click="visible = true" />
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "news-comment-check",

  props: {
    modelValue: [Number, String]
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    // 請求服務
    const { service } = useCool();

    // 關鍵字
    const keyword = ref<string>("");

    const visible = ref<boolean>(false);

    // 樹形列表
    const list = ref<any[]>([]);

    // 展開值
    const expandedKeys = ref<any[]>([]);

    // el-tree 組件
    const Tree = ref<any>({});

    // 綁定值回調
    function onCurrentChange({ id }: any) {
      emit("update:modelValue", id);
      visible.value = false;
    }

    // 更新列表
    function refresh() {
      service.industry.category.list().then((res: any) => {
        const _list = res.filter((e: any) => e.type != 2);

        list.value = _list;
      });
    }

    // 過濾節點
    function filterNode(value: string, data: any) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }

    // 節點名稱
    const name = computed(() => {
      const item = list.value.find((e) => e.id == props.modelValue);
      return item ? item.name : "無";
    });

    // 樹形列表
    const treeList = computed(() => deepTree(list.value));

    // 監聽關鍵字過濾
    watch(keyword, (val: string) => {
      Tree.value.filter(val);
    });

    onMounted(function () {
      refresh();
    });

    return {
      visible,
      keyword,
      list,
      expandedKeys,
      Tree,
      name,
      treeList,
      refresh,
      filterNode,
      onCurrentChange,
      Search
    };
  }
});
</script>

<style lang="scss">
.menu-check {
  box-sizing: border-box;

  .el-input {
    margin-bottom: 10px;
  }

  &__scroller {
    max-height: 400px;
    overflow: hidden auto;
  }
}
</style>
