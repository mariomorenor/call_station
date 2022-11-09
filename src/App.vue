<script>
import { useStore } from './store';

export default {
  setup() {
    const store = useStore()

    return {
      store
    }
  },
  sockets: {
    connect() {
      this.store.status = true
      this.$socket.emit("nuevo", {
        ...this.store.config.client,
      });
      this.$socket.emit("clientes_conectados", "", (response) => {
        console.log(response);
      })
    },
    disconnect() {
      this.store.status = false
    },
    clientes_en_espera(clients) {
      console.log(clients);
    },
    nuevo_cliente_en_espera(client) {
      console.log(client);
    }
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
