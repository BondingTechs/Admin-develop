export const proxy = {
  "/dev": {
    target: "http://127.0.0.1:8001",
    // target: "https://admin.bondingtechs.com/api",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/dev/, "")
  },

  "/prod": {
    target: "https://admin.bondingtechs.com/api",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/prod/, "/api")
  }
};
