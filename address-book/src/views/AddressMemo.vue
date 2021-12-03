<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>メモ</h1>
      </v-flex>
      <v-flex xs5 mt-5>
        <v-card>
          <v-textarea clearable clear-icon="mdi-close-circle" class="pa-3 mx-auto" v-model="address.text" rows="10" auto-grow placeholder="自由に記述してください"></v-textarea>
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
  data() {
    return {
      address: {}
    }
  },
  created () {
    const address = this.$store.getters.getAddressById(this.$route.params.address_id)
    if (address) {
      this.address = address
    }
  },
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