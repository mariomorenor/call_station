import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";
import { useStore } from "./store";
const app = createApp(App);
const pinia = createPinia();

ipcRenderer.get("config").then((config) => {
  const server = config.server;

  app
    .use(router)
    .use(pinia)
    .use(
      new VueSocketIO({
        connection: io(`http://${server.host}:${server.port}`),
      })
    );

  const store = useStore();
  store.config = config;
  app.mount("#app");
});
