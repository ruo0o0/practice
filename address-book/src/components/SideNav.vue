<template>
    <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="photoURL" :src="photoURL">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="(item, index) in addresses" :key="index" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-group no-action :prepend-icon="label.icon">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item class="pl-12" v-for="child in item.labels" :key="child.id" :to="{name: 'addresses', params: {label_id: child.id}}">
            <v-list-item-icon>
              <v-icon>mdi-label-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                {{ child.title }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon small @click.prevent="deleteConfirm(child.id)">mdi-delete</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item class="pl-12" @click.stop="overlay">
            <v-list-item-icon>
              <v-icon>{{ createLabel.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ createLabel.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  created () {
    this.item.labels = this.$store.state.labels
  },
  data() {
    return {
    addresses: [
      {title: "連絡先一覧", icon: "mdi-menu", link: { name: 'addresses' }},
      ],
    item: {
      title: "ラベル",
      labels: []
    },
    createLabel: {title: "ラベルを作成", icon: "mdi-plus"},
    label: {icon: "mdi-label"},
    }
  },
  computed: {
    ...mapGetters(['userName', 'photoURL'])
  },
  methods: {
    deleteConfirm (id) {
      if (confirm("削除してよろしいですか?")) {
        this.deleteLabel({id})
        this.$router.push({name: 'addresses'})
      }
    },
    ...mapActions(['overlay', 'deleteLabel'])
  }
}
</script>
