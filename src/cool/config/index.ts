import dev from "./dev";
import prod from "./prod";

// 是否开发模式
export const isDev = import.meta.env.MODE === "development";

// 配置
export const config = {
  // 项目信息
  app: {
    name: "管理後台",

    // 菜单
    menu: {
      // 是否分组显示
      isGroup: false,
      // 自定义菜单列表
      list: []
    },

    // 路由
    router: {
      // 模式
      mode: "history",
      // 转场动画
      transition: "",
      // 首页组件
      home: () => import("/$/demo/views/home/index.vue")
    },

    // 字體图标库
    iconfont: []
  },

  // 忽略规则
  ignore: {
    // 不显示請求进度条
    NProgress: ["/sys/info/record"],
    // 页面不需要登录验证
    token: ["/login", "/401", "/403", "/404", "/500", "/502"]
  },

  // 调试
  test: {
    token: "",
    mock: false,
    eps: true
  },

  // 当前环境
  ...(isDev ? dev : prod)
};

export * from "./proxy";
