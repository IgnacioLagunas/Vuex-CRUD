<template>
  <div>
    <h1>Usuarios</h1>

    <v-container fluid>
      <v-row justify="center"> </v-row>
    </v-container>

    <TablaUsuarios />
  </div>
</template>

<script>
// import TablaDeUsuarios from '../components/TablaDeUsuarios.vue'
import TablaUsuarios from '../components/TablaUsuarios.vue'

export default {
  components: { TablaUsuarios },
}
</script>

<style></style>
