<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>
      <v-flex xs12 mt-5 mr-5 text-right>
        <router-link :to="{ name: 'address_edit' }">
          <v-btn color="info">
            連絡先追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs-12 mt-5 justify-center>
        <v-text-field v-model="search" label="検索" single-line hide-details></v-text-field>
        <v-data-table
         :headers="headers"
         :items="addresses"
         :search="search"
         class="elevation-1"
        >
          <template v-slot:item.action="{item}">
            <router-link :to="{name: 'address_edit', params: { address_id: item.id }}">
              <v-icon small class="mr-4">mdi-pencil</v-icon>
            </router-link>
            <router-link :to="{name: 'address_memo', params: { address_id: item.id }}">
              <v-icon small class="mr-4">mdi-message-text</v-icon>
            </router-link>
            <v-icon small class="mr-4" @click="deleteConfirm(item.id)">mdi-delete</v-icon>
            <router-link :to="{name: 'label_attach', params: {address_id: item.id}}">
              <v-icon small class="mr-4">mdi-label</v-icon>
            </router-link>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.addresses = this.$store.state.addresses
  },
  beforeRouteUpdate(to, from, next) {
    const addresses = this.$store.getters.getAddressesByLabel(to.params.label_id)
    if (!to.params.label_id) {
      this.addresses = this.$store.state.addresses
    } else {
      if (addresses.length != 0) {
        this.addresses = addresses
      } else {
        this.addresses = []
      }
    }
    next()
  },
  data() {
    return {
      loading: false,
      search: '',
      headers: [
        {text: '名前', value: 'name'},
        {text: '電話番号', value: 'tel'},
        {text: 'メールアドレス', value: 'email'},
        {text: '住所', value: 'address'},
        {text: '操作', value: 'action', sortable: false}
      ],
      addresses: [],
    }
  },
  methods: {
    deleteConfirm (id) {
      if (confirm("削除してよろしいですか?")) {
        this.deleteAddress({id})
      }
    },
    ...mapActions(['deleteAddress'])
  }
}
</script>
<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>