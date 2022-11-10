import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    config: {
      server: {
        host: "",
        port: "",
      },
      client: {
        user: "",
        department: "",
      },
    },
    status: false,
    clients: [],
    peer:{},
    call:{}
  }),
});
