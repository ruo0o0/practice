import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    addresses: [],
    login_user: null,
    overlay: false,
    labels: [],
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    addAddress (state, {id, address}) {
      address.id = id
      state.addresses.push(address)
    },
    updateAddress (state, {id, address}) {
      const index = state.addresses.findIndex( address => address.id === id)
      state.addresses[index] = address
    },
    deleteAddress (state, {id}) {
      const index = state.addresses.findIndex( address => address.id === id)
      state.addresses.splice(index, 1)
    },
    deleteAttachedLabel (state, {id, address}) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses[index] = address
    },
    overlay (state) {
      state.overlay = !state.overlay
      state.drawer = false
    },
    addLabel (state, {id, label}) {
      label.id = id
      state.labels.push(label)
    },
    deleteLabel (state, {id}) {
      const index = state.labels.findIndex( label => label.id === id)
      state.labels.splice(index, 1)
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser') 
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    fetchAddresses ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress', { id: doc.id, address: doc.data() }))
      })
    },
    addAddress ({ getters, commit }, address) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc => {
        commit('addAddress', { id: doc.id, address })
        })
      }
    },
    updateAddress ({ getters, commit }, {id, address}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
        commit('updateAddress', { id, address })
        })
      }
    },
    deleteAddress ({ getters, commit }, {id}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
        commit('deleteAddress', { id })
        })
      }
    },
    deleteAttachedLabel ({ getters, commit }, {id, address}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update({label_id: firebase.firestore.FieldValue.delete()}).then(() => {
          commit('deleteAttachedLabel', {id, address})
        })
      }
    },
    overlay ({ commit }) {
      commit('overlay')
    },
    addLabel ({ getters, commit }, label) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/labels`).add(label).then(doc => { commit( 'addLabel', { id: doc.id, label})})
      }
    },
    fetchLabels ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/labels`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addLabel', { id: doc.id, label: doc.data() }))
      })
    },
    deleteLabel ({ getters, commit }, {id}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/labels`).doc(id).delete().then(() => {
        commit('deleteLabel', { id })
        })
      }
    },
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id),
    getAddressesByLabel: state => id => state.addresses.filter(address => address.label_id === id)
  }
})
