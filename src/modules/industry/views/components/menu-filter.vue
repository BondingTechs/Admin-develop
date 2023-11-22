<template>
  <el-select style="margin-right: 10px" v-model="categoryFilter" clearable placeholder="請選擇">
    <el-option-group v-for="group in categoriesSelect" :key="group.label" :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      >
        <span style="float: left">{{ item.label }}</span>
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { add } from "lodash";
import { deepTree } from "/@/cool/utils";
import { ref, onMounted, watch } from "vue";
import { useCool } from "/@/cool";

const { service } = useCool();

interface Props {
  type: "article" | "tip";
}

const props = withDefaults(defineProps<Props>(), {
  type: "article"
});

defineEmits(["choose"]);

// 分類篩選
const categoryFilter = ref("");
const categories = ref<any>([]);
const categoriesSelect = ref<any[]>([]);

const getCategoryFilter = () => {
  service.industry.category
    .list()
    .then((res: any[]) => {
      categories.value = res;
      if (props.type === "article") {
        categoriesSelect.value = res.filter((e) => e.articleCount !== "0" || !e.parentId);
      } else if (props.type === "tip") {
        categoriesSelect.value = res.filter((e) => e.tipCount !== "0" || !e.parentId);
      }
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
        const disabled = parentCount === 0;
        return {
          label: parent.name,
          options: [
            {
              label: disabled ? "無" : "全部",
              value: parent.id,
              disabled,
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

watch(categoryFilter, () => {
  getCategoryFilter();
});
</script>
