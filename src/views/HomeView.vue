<template>
  <header>
    <div>
      <h3>Bienvenido, {{ config.client.user }}.</h3>
      <span><strong>Estación:</strong> {{ config.client.department }}</span>
    </div>
  </header>
  <hr>
  <main>
    <div class="card" v-for="client in clients" :key="client.id">
      <table>
        <tr>
          <td>Nombre:</td>
          <td>{{ client.name }}</td>
        </tr>
        <tr>
          <td>Cédula:</td>
          <td>{{ client.identity }}</td>
        </tr>
        <tr>
          <td>Carrera:</td>
          <td>{{ client.career }}</td>
        </tr>
      </table>
      <button @click="connectClient(client)">Conectar</button>
      <button>Pausar</button>
      <button @click="removeClient(client)">Remover</button>
    </div>
  </main>
  <footer>
    <div>
      <label for="">Server: {{ config.server.host }}:{{ config.server.port }}</label>
    </div>
    <div>
      <span class="status">Estado: <span v-text="status ? 'Conectado' : 'No Conectado'"></span></span>
    </div>
  </footer>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useStore } from '../store';

export default {
  name: "HomeView",
  computed: {
    ...mapWritableState(useStore, ["config", "status", "clients", "call", "peer"])
  },
  methods: {
    connectClient(client) {
      console.log(client);
      navigator
        .mediaDevices
        .getUserMedia({
          audio: true
        })
        .then((stream) => {

          this.call = this.peer.call(client.peer_id, stream);
          this.call.on("stream", (remoteStream) => {
            const audio = document.getElementById("remoteAudio")
            audio.srcObject = remoteStream;
            audio.play()
          })
        })
    },
    removeClient(client) {
      dialog
        .Show("info", "Removiendo...", "¿Está seguro de remover? No se podrá deshacer", ["Cancelar", "Aceptar"])
        .then(result => {
          if (result.response == 1) {
            this.clients = this.clients.filter(c => c.socket_id != client.socket_id)
            this.$socket.emit("remover_cliente", client);
          }
        })
    }
  }
}
</script>

<style lang="scss">
header {
  & h3 {
    margin-bottom: .5rem;
  }
}

main {
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  overflow-y: auto;
  align-content: flex-start;
  justify-content: center;
  height: 70vh;
  gap: 15px;


  & .card {
    border: 1px solid black;
    border-radius: 1rem;
    width: 14rem;
    height: fit-content;
    transition: all .3s;
    padding: 1rem;

    &:hover {
      box-shadow: 1px 1px 15px rgb(132, 132, 132);
    }
  }
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgb(235, 235, 235);
  width: 100%;
  font-size: small;
  display: flex;
  justify-content: space-around;

}
</style>