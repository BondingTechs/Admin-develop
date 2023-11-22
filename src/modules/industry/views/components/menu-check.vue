<template>
  <div class="role-perms">
    <div class="scroller">
      <el-checkbox-group v-model="checked">
        <div v-for="category in list" :key="category.id">
          <el-checkbox class="checkbox" :label="category.id">{{ category.name }}</el-checkbox>
          <div v-if="props.showChild" class="child">
            <el-checkbox
              class="checkbox"
              v-for="child in category.children"
              :label="child.id"
              :key="child.id"
              >{{ child.name }}</el-checkbox
            >
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "industry-category"
};
</script>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { deepTree } from "/@/cool/utils";
import { useCool } from "/@/cool";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  showChild: {
    type: Boolean,
    default: true
  }
});

const { service } = useCool();

// 樹形列表
const list = ref<any[]>([]);

// 已選列表
const checked = ref<any[]>([]);

// 更新列表
function refresh() {
  service.industry.category
    .list()
    .then((res: any[]) => {
      list.value = deepTree(res);
      if (!props.multiple) {
        checked.value.push(props.modelValue);
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

// 監聽選取box
watch(checked, (val) => {
  if (!props.multiple && checked.value.length > 1) {
    checked.value.shift();
  }
  emit("update:modelValue", checked);
});

// 更新監聽
watch(
  () => props.modelValue,
  () => {
    if (!props.multiple) {
      return checked.value.push(props.modelValue);
    }

    if (checked.value === props.modelValue) return;

    checked.value = props.modelValue;
  }
);

onMounted(() => {
  refresh();
});
</script>

<style lang="scss">
.role-perms {
  .scroller {
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    // max-height: 200px;
    box-sizing: border-box;
    overflow-x: hidden;
    padding: 15px 0 5px 15px;
  }
}
.checkbox {
  display: block;
}
.child {
  margin-left: 2rem;
}
</style>
