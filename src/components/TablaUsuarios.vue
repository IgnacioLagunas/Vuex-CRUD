<template>
  <v-data-table
    :headers="headers"
    :items="mostrar ? usuariosComputed : []"
    sort-by="calories"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Pacientes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Nuevo Usuario </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.edad" label="Edad"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog"> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
            <v-card-text v-if="alert">
              <v-alert dense outlined class="mt-2" type="error">Por favor rellene todos los campos.</v-alert>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Seguro que quiere eliminar a este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="refrescarUsuarios"> <v-icon large>mdi-cloud-download</v-icon> </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    mostrar: false,
    headers: [
      { text: 'Nombre', sortable: false, align: 'start', value: 'nombre' },
      { text: 'Apellido', sortable: false, value: 'apellido' },
      { text: 'Email', sortable: false, value: 'email' },
      { text: 'Edad', sortable: false, value: 'edad' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    usuarios: [],
    editedIndex: -1,
    alert: false,
    editedItem: {
      nombre: '',
      apellido: '',
      email: '',
      edad: 0,
    },
    defaultItem: {
      nombre: '',
      apellido: '',
      email: '',
      edad: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    },
    usuariosComputed() {
      return this.$store.state.usuarios.lista
    },
  },

  watch: {
    dialog(val) {
      val || this.closeDialog()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  beforeCreate() {
    this.$store.dispatch('usuarios/traerUsuarios')
  },

  methods: {
    refrescarUsuarios() {
      this.mostrar = true
    },
    editItem(item) {
      this.editedIndex = this.usuariosComputed.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (Object.values(this.editedItem).some((value) => value === '')) {
        this.alert = true
      } else {
        if (this.editedIndex > -1) {
          this.$store.dispatch('usuarios/updateUser', this.editedItem)
        } else {
          this.$store.dispatch('usuarios/addUser', this.editedItem)
        }
        this.closeDialog()
        this.alert = false
      }
    },
    deleteItem(item) {
      this.editedIndex = this.usuariosComputed.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('usuarios/deleteUser', this.editedItem.id)
      this.closeDelete()
    },
  },
}
</script>
