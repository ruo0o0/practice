<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>ラベル編集</h1>
      </v-flex>
      <v-flex xs5 mt-5>
        <v-card
          class="mx-auto"
          tile
        >
          <v-list>
            <v-list-item-group
              color="primary"
              v-model="selectedItem"
            >
              <v-list-item
                v-for="(label, i) in labels"
                :key="i"
                @click="$set(address, 'label_id', `${label.id}`)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-label-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="label.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <div class="text-center">
            <v-btn @click="$router.push({ name: 'addresses' })">キャンセル</v-btn>
            <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    created () {
      this.labels = this.$store.state.labels
      const address = this.$store.getters.getAddressById(this.$route.params.address_id)
      if (address) {
        this.address = address
      }
      for (let i = 0; i < this.labels.length; i++) {
        this.label_ids.push(this.labels[i].id);
      }
      this.selectedItem = this.label_ids.indexOf(this.address.label_id)
    },
    data: () => ({
      selectedItem: null,
      labels: [],
      label_ids: [],
      address: {},
    }),
    methods: {
      submit () {
        this.updateAddress({ id: this.$route.params.address_id, address: this.address })
        this.$router.push({ name: 'addresses' })
        this.address = {}
      },
      ...mapActions(['updateAddress'])
    }
  }
</script>