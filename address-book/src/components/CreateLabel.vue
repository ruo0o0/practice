<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field label="ラベル名" v-model="label.title"></v-text-field>
            </v-form>
          </v-card-text>
          <div class="text-center">
            <v-btn @click="overlay">キャンセル</v-btn>
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
  data () {
    return {
      label: {}
    }
  },
  methods: {
    submit() {
      this.addLabel(this.label)
      this.overlay()
      this.label = {}
    },
    ...mapActions(['overlay', 'addLabel']),
  }
}
</script>