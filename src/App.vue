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
      this.$socket.emit("nuevo_manager", this.store.config.client);
      this.$socket.emit("clientes_conectados", { department: this.store.config.client.department }, (clientes) => {
        console.log(clientes);
      })
    },
    disconnect() {
      this.store.status = false
    },
    new_client(client) {
      this.store.clients.push(client)
    }
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
