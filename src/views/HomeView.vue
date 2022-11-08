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
      posi
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
import { mapState } from 'pinia';
import { useStore } from '../store';

export default {
  name: "HomeView",
  computed: {
    ...mapState(useStore, ["config", "status","clients"])
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
  height: 70vh;
  gap:15px;

  & .card {
    border: 1px solid black;
    border-radius: 1rem;
    width: 14rem;
    height: 6rem;
    transition: all .3s;
    padding: 1rem;

    &:hover {
      cursor: pointer;
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