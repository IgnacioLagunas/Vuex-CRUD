<template>
  <div>
    <h1>Usuarios</h1>

    <TablaDeUsuarios />
    <v-card class="d-flex justify-center mb-6" elevation="0">
      <v-btn icon @click="$store.dispatch('usuarios/traerLosUsuarios')">
        <v-icon large>mdi-cloud-download</v-icon>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import TablaDeUsuarios from '../components/TablaDeUsuarios.vue'

export default {
  components: { TablaDeUsuarios },
}
</script>

<style></style>
