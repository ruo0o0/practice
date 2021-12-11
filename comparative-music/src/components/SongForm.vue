<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">楽曲追加</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="曲名"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="アーティスト名"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input label="楽曲を選択"></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input accept="image/*" label="画像を選択"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="switchDialog"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="switchDialog"
          >
            作成
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data () {

    },
    methods: {
      ...mapActions(['switchDialog'])
    }
  }
</script>