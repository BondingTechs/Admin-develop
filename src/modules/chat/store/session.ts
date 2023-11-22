import { defineStore } from "pinia";
import { ref } from "vue";
import { service } from "/@/cool";

export const useSessionStore = defineStore("chat-session", () => {
  // 加载状态
  const loading = ref(false);

  // 列表
  const list = ref<any[]>([]);

  // 選中
  const value = ref<any>();

  // 获取列表
  async function get(params?: any) {
    loading.value = true;

    // 发送請求
    await service.chat.session.page(params).then((res) => {
      // 默認加载第一个會话的消息
      if (!value.value) {
        set(res.list[0]);
      }

      // 设置列表
      list.value = res.list;
    });

    loading.value = false;
  }

  // 设置值
  function set(data: any) {
    // 设置值
    value.value = data;
  }

  return {
    loading,
    list,
    value,
    get,
    set
  };
});
