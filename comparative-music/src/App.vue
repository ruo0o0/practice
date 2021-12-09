<template>
  <v-app>
    <header>
      <v-app-bar app color="#121212" flat>
        <v-avatar size="30">
          <img src="https://avatars2.githubusercontent.com/u/1363954?s=460&v=4">
        </v-avatar>
        <v-toolbar-title>
          Comparative Music
        </v-toolbar-title>
        <v-tabs>
          <v-tab>Home</v-tab>
          <v-tab>Library</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary right>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
              <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import constants from './common/constants.js'
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      menuItems: constants.menuItems
    }
  }
};
</script>

<style lang="scss" scoped>
  .v-toolbar__title {
    overflow: visible !important;
    margin-right: 50px !important;
    margin-left: 50px !important;
  }

  .v-app-bar__nav-icon {
    @include display_pc {
      display: none !important;
    }
  }

  .v-tabs {
    display: none;

    @include display_pc {
      display: block !important;
      // margin-left: 50px !important
    }
  }
</style>
