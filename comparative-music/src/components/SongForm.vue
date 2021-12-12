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
                  label="曲名" v-model="music.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="アーティスト名" v-model="music.artist"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input accept="audio/*" label="楽曲を選択" @change="inputAudioFile" v-if="show"></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input accept="image/*" label="画像を選択" @change="inputImageFile" v-if="show"></v-file-input>
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
            @click="fileUpload(); switchDialog()"
          >
            作成
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from 'firebase'
import "firebase/storage"
import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        music: {},
        file_image: '',
        file_audio: '',
        show: true,
      }
    },
    methods: {
      inputImageFile (event) {
        this.file_image = event
      },
      inputAudioFile (event) {
        this.file_audio = event
      },
      async fileUpload () {
        const storageImage = firebase.storage().ref("images/" + this.file_image.name)
        storageImage.put(this.file_image)
        const storageAudio = firebase.storage().ref("audios/" + this.file_audio.name)
        storageAudio.put(this.file_audio)
        this.show = false
        this.$nextTick(function () {
          this.show = true
        })
        await storageImage.getDownloadURL().then(url => {
          this.$set(this.music, 'image_url', url)
        })
        await storageAudio.getDownloadURL().then(url => {
          this.$set(this.music, 'audio_url', url)
        })
        this.addMusic(this.music)
      },
      ...mapActions(['switchDialog','addMusic'])
    }
  }
</script>