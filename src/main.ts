import { createApp } from "vue";
import App from "./App.vue";
import { bootstrap } from "./cool";

const app = createApp(App);

// 啟動
bootstrap(app)
  .then(() => {
    app.mount("#app");
  })
  .catch((err) => {
    console.error("ADMIN 啟動失敗", err);
  });
