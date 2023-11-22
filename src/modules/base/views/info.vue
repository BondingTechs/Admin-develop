<template>
  <div class="view-my">
    <div class="title">基本信息</div>

    <el-form label-width="100px" :model="form" :disabled="loading">
      <el-form-item label="頭像">
        <cl-upload v-model="form.avatar" />
      </el-form-item>

      <el-form-item label="姓氏">
        <el-input v-model="form.firstName" placeholder="請填寫姓氏" />
      </el-form-item>

      <el-form-item label="名字">
        <el-input v-model="form.lastName" placeholder="請填寫名字" />
      </el-form-item>

      <el-form-item label="密碼">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="loading" @click="save">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" name="my-info" setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useBase } from "/$/base";
import { useCool } from "/@/cool";
import { cloneDeep } from "lodash-es";

const { service } = useCool();
const { user } = useBase();

// 表單數據
const form = reactive<any>(cloneDeep(user.info));

// 保存狀態
const loading = ref(false);

// 保存
async function save() {
  const { avatar, firstName, lastName, password } = form;

  loading.value = true;

  await service.base.comm
    .personUpdate({
      avatar,
      firstName,
      lastName,
      password
    })
    .then(() => {
      form.password = "";
      ElMessage.success("修改成功");
      user.get();
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });

  loading.value = false;
}
</script>

<style lang="scss">
.view-my {
  background-color: var(--el-bg-color);
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .el-form {
    width: 400px;
    max-width: 100%;
  }

  .title {
    margin-bottom: 30px;
    font-size: 15px;
  }
}
</style>
