import axios from 'axios'

const urlBase = 'http://localhost:5000/usuarios'

export const usuariosModulo = {
  namespaced: true,
  state: { lista: [] },
  mutations: {
    SET_LIST(state, nuevaLista) {
      state.lista = nuevaLista
    },
  },
  actions: {
    async traerUsuarios(context) {
      try {
        const UsuariosResponse = await axios.get(urlBase)
        console.log('trayendo usuarios')
        context.commit('SET_LIST', UsuariosResponse.data)
      } catch (e) {
        console.error(e)
      }
    },

    async addUser(context, nuevoUsuario) {
      console.log(nuevoUsuario, 'para agregar')
      try {
        const res = await axios.post(urlBase, nuevoUsuario)
        console.log(`Usuario ${res.data.nombre} ${res.data.apellido} ha sido agregado exitosamente`)
      } catch (e) {
        console.log(e)
      }
      context.dispatch('traerUsuarios')
    },

    async updateUser(context, updatedUser) {
      console.log(updatedUser, 'para updatear')
      try {
        const res = await axios.put(`${urlBase}/${updatedUser.id}`, updatedUser)
        console.log(`Usuario ${res.data.nombre} ${res.data.apellido}, id: ${res.data.id} ha sido editado exitosamente`)
      } catch (e) {
        console.log(e)
      }
      context.dispatch('traerUsuarios')
    },

    async deleteUser(context, deleteIndex) {
      try {
        const res = await axios.delete(`${urlBase}/${deleteIndex}`)
        console.log(
          `Usuario ${res.data.nombre} ${res.data.apellido}, id: ${res.data.id} ha sido eliminado exitosamente`
        )
      } catch (e) {
        console.log(e)
      }
      context.dispatch('traerUsuarios')
    },
  },
}
