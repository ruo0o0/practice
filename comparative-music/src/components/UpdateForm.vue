<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog_update"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">楽曲編集</span>
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
            @click="switchDialogUpdate"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="fileUpdate(); switchDialogUpdate()"
          >
            作成
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteConfirm($store.state.music_tmp.id)"
          >
            削除
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
      deleteConfirm (id) {
        if (confirm('削除してよろしいですか?')) {
          this.deleteMusic(id)
          this.switchDialogUpdate
        }
      },
      async fileUpdate () {
        const storageImage = firebase.storage().ref("images/" + this.file_image.name)
        await storageImage.put(this.file_image)
        const storageAudio = firebase.storage().ref("audios/" + this.file_audio.name)
        await storageAudio.put(this.file_audio)
        await storageImage.getDownloadURL().then(url => {
          this.$set(this.music, 'image_url', url)
        })
        await storageAudio.getDownloadURL().then(url => {
          this.$set(this.music, 'audio_url', url)
        })
        this.updateMusic({id: this.$store.state.music_tmp.id, music: this.music})
        this.music = {}
        this.show = false
        this.$nextTick(function () {
          this.show = true
        })
      },
      ...mapActions(['switchDialogUpdate','updateMusic','deleteMusic'])
    }
  }
</script>