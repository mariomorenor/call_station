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
        this.store.clients = [...response]
      })
    },
    disconnect() {
      this.store.status = false
    },
    clientes_en_espera(clients) {
      this.store.clients = clients
    },
    nuevo_cliente_en_espera(client) {
      this.store.clients.push(client)
    },
    socket_desconectado(socket) {
      this.store.clients = this.store.clients.filter(client => client.socket_id != socket.socket_id)
    }
  }
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
