<template>
  <v-app>
    <v-app-bar
      app
      v-show="!loading"
    >
      <v-app-bar-nav-icon v-show="$store.state.login_user" @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>アドレス帳</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <SideNav v-show="!loading"></SideNav>
    <v-overlay :dark="false" v-model="$store.state.overlay">
      <CreateLabel></CreateLabel>
    </v-overlay>
    <v-content v-show="!loading">
      <v-container fluid fill-height align-start>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Loading v-show="loading"></Loading>
  </v-app>
</template>

<script>
import SideNav from './components/SideNav.vue'
import CreateLabel from './components/CreateLabel.vue'
import { mapActions } from 'vuex'
import firebase from 'firebase'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    SideNav,
    CreateLabel,
    Loading
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user)
        this.fetchAddresses()
        this.fetchLabels()
        if ( this.$router.currentRoute.name === 'home') this.$router.push({name: 'addresses'})
      } else {
        this.deleteLoginUser()
        this.$router.push({name: 'home'})
      }
    })
  },
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  data () {
    return {
      loading: true,
    }
  },
  methods: {
    ...mapActions(['toggleSideMenu', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchAddresses', 'fetchLabels'])
  }
};
</script>
