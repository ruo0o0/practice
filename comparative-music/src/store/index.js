import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    album: [],
    login_user: null,
    drawer: false,
    dialog: false,
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
    switchDialog (state) {
      state.dialog = !state.dialog
    },
    addMusic (state, {id, music}) {
      music.id = id
      state.album.push(music)
    }
  },
  actions: {
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser ({commit}) {
      commit('deleteLoginUser')
    },
    toggleSideMenu ({commit}) {
      commit('toggleSideMenu')
    },
    switchDialog ({commit}) {
      commit('switchDialog')
    },
    addMusic ({ getters, commit }, music) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/album`).add(music).then(doc => {
        commit('addMusic', { id: doc.id, music })
        })
      }
    },
    fetchAlbum ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/album`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addMusic', { id: doc.id, music: doc.data() }))
      })
    },
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : 'default_user_icon.png',
    uid: state => state.login_user ? state.login_user.uid : null,
  }
})
