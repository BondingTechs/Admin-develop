<template>
  <cl-view-group :title="title">
    <template #left>
      <dept-tree @row-click="onDeptRowClick" @user-add="onDeptUserAdd" />
    </template>

    <template #right>
      <cl-crud ref="Crud">
        <el-row>
          <cl-refresh-btn />
          <cl-add-btn />
          <cl-multi-delete-btn />
          <el-button
            v-permission="service.base.sys.user.permission.move"
            type="success"
            :disabled="selects.ids.length == 0"
            @click="toMove()"
            >轉移</el-button
          >
          <cl-flex1 />
          <cl-search-key />
        </el-row>

        <el-row>
          <cl-table
            ref="Table"
            :default-sort="{
              prop: 'createTime',
              order: 'descending'
            }"
            @selection-change="onSelectionChange"
          >
            <!-- 身份驗證 -->
            <template #column-identityStatus="{ scope }">
              <el-button
                disable-transitions
                size="small"
                effect="dark"
                style="margin: 2px"
                :type="identityStatus.find((e) => e.value === scope.row.identityStatus)?.type"
                @click="openIdentityDialog(scope.row)"
                >{{ identityStatus.find((e) => e.value === scope.row.identityStatus)?.label }}
              </el-button>
            </template>

            <!-- 權限 -->
            <template #column-roleName="{ scope }">
              <template v-if="scope.row.roleName">
                <el-tag
                  v-for="(item, index) in scope.row.roleName.split(',')"
                  :key="index"
                  disable-transitions
                  size="small"
                  effect="dark"
                  style="margin: 2px"
                  >{{ item }}
                </el-tag>
              </template>
            </template>

            <!-- 單個轉移 -->
            <template #slot-btn="{ scope }">
              <el-button
                v-permission="service.base.sys.user.permission.move"
                text
                bg
                @click="toMove(scope.row)"
                >轉移</el-button
              >
            </template>
          </cl-table>
        </el-row>

        <el-row>
          <cl-flex1 />
          <cl-pagination />
        </el-row>

        <!-- 新增、編輯 -->
        <cl-upsert ref="Upsert">
          <template #slot-roleIdList="{ scope }">
            <el-select
              v-model="scope.roleIdList"
              :multiple="true"
              :multiple-limit="1"
              :disabled="scope.roleIdList.includes(11)"
              placeholder="請選擇"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </template>
        </cl-upsert>

        <!-- 移動 -->
        <dept-move :ref="setRefs('deptMove')" />
      </cl-crud>
      <cl-dialog :title="identityTitle" width="600px" height="100%" v-model="identityVisible">
        <div class="flex flex-wrap justify-around space-x-4" style="display: flex">
          <div class="block" style="margin-right: 20px">
            <div
              class="text-center font-bold mb-3"
              style="margin-bottom: 2em; font-weight: bold; text-align: center"
            >
              證件照
            </div>
            <el-image style="max-width: 600px" :src="identityInfo?.positive" fit="contain" />
          </div>
        </div>
        <div>
          <label for="rejectReason">駁回原因</label>
          <el-input id="rejectReason" v-model="rejectReason" />
        </div>
        <div style="display: flex; justify-content: center; margin-top: 25px">
          <el-button @click="identityAgree()" type="success">同意</el-button>
          <el-button @click="identityReject" type="danger">駁回</el-button>
          <el-button @click="identityVisible = false">取消</el-button>
        </div>
      </cl-dialog>
    </template>
  </cl-view-group>
</template>

<script lang="ts" name="sys-user" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { computed, onMounted, reactive, ref } from "vue";
import DeptMove from "./components/dept/move.vue";
import DeptTree from "./components/dept/tree.vue";
import { useCool } from "/@/cool";

import { ElMessage } from "element-plus";
import { useDict } from "/$/dict";

const { service, refs, setRefs } = useCool();

const { dict } = useDict();
const identityStatus = dict.get("identityStatus");

// 選擇項
const selects = reactive<any>({
  dept: {},
  ids: []
});

// 標題
const title = computed(() => {
  return `成員列表（${selects.dept?.name || ""}）`;
});

// cl-crud 配置
const Crud = useCrud({
  service: service.base.sys.user
});

// cl-table 配置
const Table = useTable({
  columns: [
    {
      type: "selection",
      width: 60
    },
    // {
    //   prop: "avatar",
    //   label: "頭像",
    //   component: {
    //     name: "cl-avatar"
    //   }
    // },
    {
      prop: "name",
      label: "姓名",
      minWidth: 120
    },
    {
      prop: "username",
      label: "用戶名",
      minWidth: 150
    },
    {
      prop: "phone",
      label: "手機號碼",
      minWidth: 120
    },
    {
      prop: "departmentName",
      label: "部門",
      minWidth: 150
    },
    {
      prop: "roleName",
      label: "角色",
      headerAlign: "center",
      minWidth: 100
    },
    {
      prop: "status",
      label: "狀態",
      minWidth: 100,
      dict: [
        {
          label: "正常",
          value: 1,
          type: "success"
        },
        {
          label: "停權",
          value: "danger",
          type: "danger"
        }
      ]
    },
    {
      prop: "emailStatus",
      label: "信箱驗證",
      minWidth: 100,
      dict: dict.get("emailStatus")
    },
    {
      prop: "identityStatus",
      label: "身份驗證",
      minWidth: 100,
      dict: dict.get("identityStatus")
    },
    {
      prop: "remark",
      label: "備註",
      minWidth: 150
    },
    {
      prop: "createTime",
      label: "創建時間",
      sortable: "custom",
      minWidth: 160
    },
    {
      type: "op",
      buttons: ["slot-btn", "edit", "delete"],
      width: 240
    }
  ]
});

const roleList: any = ref();
onMounted(async () => {
  roleList.value = await service.base.sys.role.list();
});

// cl-upsert 配置
const Upsert = useUpsert({
  dialog: {
    width: "800px"
  },

  items: [
    {
      prop: "avatar",
      label: "頭像",
      component: {
        name: "cl-upload",
        props: {
          text: "選擇頭像"
        }
      }
    },
    {
      prop: "firstName",
      label: "姓氏",
      span: 12,
      required: true,
      component: {
        name: "el-input"
      }
    },
    {
      prop: "lastName",
      label: "名字",
      required: true,
      span: 12,
      component: {
        name: "el-input"
      }
    },
    {
      prop: "username",
      label: "用戶名",
      required: true,
      span: 12,
      component: {
        name: "el-input"
      }
    },
    () => {
      return {
        prop: "password",
        label: "密碼",
        span: 12,
        required: Upsert.value?.mode == "add",
        component: {
          name: "el-input",
          props: {
            type: "password"
          }
        },
        rules: [
          {
            min: 8,
            max: 16,
            message: "密碼長度在 8 到 16 個字符"
          }
        ]
      };
    },
    {
      prop: "gender",
      label: "性別",
      value: 1,
      component: {
        name: "el-radio-group",
        options: dict.get("userGender")
      }
    },
    {
      prop: "roleIdList",
      label: "角色",
      value: [],
      required: true,
      component: {
        name: "slot-roleIdList"
      }
      // component: {
      //   name: "el-select",
      //   options: [],
      //   props: {
      //     multiple: true,
      //     "multiple-limit": 1,
      //   }
      // }
    },
    {
      prop: "phone",
      label: "手機號碼",
      span: 12,
      component: {
        name: "el-input"
      }
    },
    {
      prop: "email",
      label: "郵箱",
      span: 12,
      component: {
        name: "el-input"
      }
    },
    {
      prop: "intro",
      label: "簡介",
      component: { name: "cl-editor-wang" }
    },
    {
      prop: "remark",
      label: "備註",
      component: {
        name: "el-input",
        props: {
          type: "textarea",
          rows: 4
        }
      }
    },
    {
      prop: "emailStatus",
      label: "信箱驗證",
      value: 17,
      component: {
        name: "el-select",
        options: dict.get("emailStatus")
      }
    },
    {
      prop: "identityStatus",
      label: "身份驗證",
      value: 24,
      component: {
        name: "el-select",
        options: dict.get("identityStatus")
      }
    },
    {
      prop: "status",
      label: "狀態",
      value: 1,
      component: {
        name: "el-select",
        options: [
          {
            label: "正常",
            value: 1
          },
          {
            label: "停權",
            value: 0
          }
        ]
      }
    }
  ],

  onSubmit(data, { next }) {
    console.log(data);
    next({
      ...data,
      departmentId: data.departmentId || '1'
    });
  }

  // async onOpen() {
  //   const roleList = await service.base.sys.role.list();

  //   // 設置權限列表
  //   Upsert.value?.setOptions(
  //     "roleIdList",
  //     roleList.map((e) => {
  //       return {
  //         label: e.name || "",
  //         value: e.id
  //       };
  //     })
  //   );
  // }
});

// 刷新列表
function refresh(params: any) {
  Crud.value?.refresh(params);
}

// 多選監聽
function onSelectionChange(selection: any[]) {
  selects.ids = selection.map((e) => e.id);
}

// 部門選擇監聽
function onDeptRowClick({ item, ids }: any) {
  selects.dept = item;

  refresh({
    page: 1,
    departmentIds: ids
  });
}

// 部門下新增成員
function onDeptUserAdd(item: any) {
  Crud.value?.rowAppend({
    departmentId: item.id
  });
}

// 移動成員
async function toMove(e?: any) {
  let ids = [];

  if (!e) {
    ids = selects.ids;
  } else {
    ids = [e.id];
  }

  refs.value.deptMove.open(ids);
}

// 開啟身份驗證窗口
const identityVisible = ref(false);
const identityInfo: any = ref({ positive: "", negative: "" });
const identityTitle = ref("");
const identityId = ref(null);
const identityData: any = ref(null);
const rejectReason = ref("");
const openIdentityDialog = async (row: any) => {
  identityData.value = row;
  identityTitle.value = `${row.name} - 身份驗證`;
  identityId.value = row.id;
  const data = await service.base.sys.user.getIdentity({ userId: row.id });
  identityInfo.value = data;
  identityVisible.value = true;
};

const identityAgree = async () => {
  await service.base.sys.user.identityAgree({ userId: identityId.value });
  identityData.value.identityStatus = 23;
  identityVisible.value = false;
  ElMessage.success("修改成功");
};
const identityReject = async () => {
  await service.base.sys.user.update({
    id: identityId.value,
    rejectReason: rejectReason.value,
    identityStatus: 22
  });

  identityVisible.value = false;
  identityData.value.identityStatus = 22;
  ElMessage.success("修改成功");
};
</script>

<style lang="scss" scoped>
:deep(.cl-view-group__left) {
  width: 200px;
}
</style>
