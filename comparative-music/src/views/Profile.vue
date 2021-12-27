<template>
  <div class="container">
    <v-card width="300">
      <v-list-item>
        <v-list-item-content class="py-2">
          <v-list-item-title v-if="!edit" class="text-center mb-2 ml-4">
            {{ $store.state.profile.name }}
            <v-icon small @click="doEdit">mdi-pencil</v-icon>
          </v-list-item-title>
          <v-list-item-title v-else class="text-center mb-2">
            <input type="text" v-model="profile.name" @blur="changeName" v-focus @keyup.enter.exact="changeName">
          </v-list-item-title>
          <input style="display: none" ref="input" type="file" accept="image/*" @change="fileUpload">
          <v-list-item-title class="mb-2">
            <v-img width="128" :src="profileImage" aspect-ratio="1" class="mx-auto" @click="$refs.input.click(); setProfile()"></v-img>
          </v-list-item-title>
          <!-- <v-btn class="mx-auto">フォローする</v-btn> -->
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense class="py-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>鑑賞データ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>演奏者</v-list-item-title>
          </v-list-item-content>
          <p class="text-body-2 my-2" >{{ artists }}人</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>曲</v-list-item-title>
          </v-list-item-content>
          <p class="text-body-2 my-2" >{{ album.length }}曲</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>感想</v-list-item-title>
          </v-list-item-content>
          <p class="text-body-2 my-2" >{{ comments }}曲</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>プロフィール</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title>フォロー</v-list-item-title>
          </v-list-item-content>
          <p class="text-body-2 my-2" >3人</p>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>フォロワー</v-list-item-title>
          </v-list-item-content>
          <p class="text-body-2 my-2" >3人</p>
        </v-list-item> -->
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-title>自己紹介</v-list-item-title>
        </v-list-item>
        <p class="font-size px-4">Write something you want to appeal</p>
      </v-list>
    </v-card>
    <v-card width="600" class="ml-4" min-height="100">
      <v-card-title class="subtitle-1 py-2">{{ $store.state.profile.name }}さんの感想</v-card-title>
      <v-divider></v-divider>
      <div
        v-for="(music, index) in filteredAlbum"
        :key="index"
      >
        <div class="flex mt-2 ml-2">
          <div>
            <v-avatar tile rounded="sm">
              <v-img :src="profileImage" aspect-ratio="1"></v-img>
            </v-avatar>
          </div>
          <div class="flex-grow">
            <p class="ml-2 mb-2">{{ $store.state.profile.name }}</p>
            <v-card color="grey darken-4" class="ma-2">
              <v-card-title class="subtitle-1">{{ music.title }}</v-card-title>
              <v-card-subtitle class="py-0">{{ music.artist }}</v-card-subtitle>
              <v-card-text class="pb-0">
                <v-textarea
                  background-color="#1E1E1E"
                  :value="music.comment"
                  readonly
                  loading="false"
                >
                </v-textarea>
              </v-card-text>
            </v-card>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import "firebase/storage"
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      album: [],
      profile: {name: 'ユーザー', profile_image: 'default_user_icon.png'},
      edit: false,
    }
  },
  created () {
    this.album = this.$store.state.album
    // this.profile = this.$store.state.profile
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    setProfile () {
      this.profile = this.$store.state.profile
    },
    doEdit () {
      this.edit = true
      this.setProfile()
    },
    changeName () {
      if (this.$store.state.profile.id) {
        this.updateProfile({id: this.$store.state.profile.id, profile: this.profile})
      } else {
        this.addProfile(this.profile)
      }
      this.edit = false
    },
    async fileUpload (event) {
      let file = event.target.files[0]
      const storageImage = firebase.storage().ref("profile_images/" + file.name)
      const that = this
      await storageImage.getDownloadURL().then(onResolve, onReject)
      function onResolve(url) {
        that.$set(that.profile, 'profile_image', url)
      }
      async function onReject () {
        await storageImage.put(file)
        await storageImage.getDownloadURL().then(url => {
          that.$set(that.profile, 'profile_image', url)
        })
      }
      if (this.$store.state.profile.id) {
        this.updateProfile({id: this.$store.state.profile.id, profile: this.profile})
      } else {
        this.addProfile(this.profile)
      }
    },
    ...mapActions(['addProfile','updateProfile'])
  },
  computed: {
    artists: function () {
      return (this.album.filter((music, index, self) => self.findIndex(e => e.artist === music.artist) === index)).length
    },
    comments: function () {
      return (this.album.filter(music => music.comment)).length
    },
    filteredAlbum: function () {
      return this.album.filter(music => music.comment)
    },
    profileImage: function () {
      if (this.$store.state.profile.profile_image) {
        return this.$store.state.profile.profile_image
      } else {
        return 'default_user_icon.png'
      }
    },
    ...mapGetters(['photoURL'])
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    align-items: flex-start;
  }
  .flex {
    display: flex;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .font-size {
    font-size: 0.8125rem;
  }
  input {
    outline: none;
    color: white;
    text-align: center;
  }
</style>