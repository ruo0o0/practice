<template>
  <v-navigation-drawer v-model="$store.state.drawer" fixed temporary right>
    <v-list nav>
      <v-list-item-group>
        <v-list-item v-for="(menuItem, index) in menuItems" :key="index" @click="$router.push(menuItem.url)">
          <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import constants from '../common/constants.js'
export default {
  data() {
    return {
    menuItems: constants.menuItems
    }
  },
}
</script>