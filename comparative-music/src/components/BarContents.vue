<template>
  <v-card tile>
    <v-progress-linear
      v-model="progress"
      class="my-0"
      height="3"
    ></v-progress-linear>

    <v-list>
      <v-list-item>
        <v-list-item-icon
          class="ml-0"
          :class="{ 'ml-3': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon>
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-spacer></v-spacer>
        <v-list-item-avatar tile size="45" class="ma-0 mr-4">
          <v-img :src="music.image_url"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ music.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ music.artist }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon>
            <v-icon>mdi-rewind</v-icon>
          </v-btn>
        </v-list-item-icon>

        <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon @click="isPlay ? stop(): play()">
            <v-icon x-large v-if="isPlay">mdi-pause</v-icon>
            <v-icon x-large v-else>mdi-play</v-icon>
          </v-btn>
        </v-list-item-icon>

        <v-list-item-icon
          class="ml-0"
          :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
        >
          <v-btn icon>
            <v-icon>mdi-fast-forward</v-icon>
          </v-btn>
        </v-list-item-icon>


      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      music: {},
      audio: new Audio,
      isPlay: false,
      duration: 0,
      currentTime: 0,
    }
  },
  created () {
    this.music = this.$store.state.music_active
  },
  mounted () {
    this.audio.src = this.music.audio_url
    this.audio.load()
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration
    })
    this.audio.addEventListener('timeupdate', () => {
    this.currentTime = this.audio.currentTime
    })
    this.play()
  },
  computed: {
    progress: function () {
      return (this.currentTime / this.duration) * 100
    }
  },
  beforeDestroy () {
    this.audio.pause()
  },
  methods: {
    play () {
      this.audio.play()
      this.isPlay = true
      this.switchPlayState()
    },
    stop () {
      this.audio.pause()
      this.isPlay = false
      this.switchPlayState()
    },
    ...mapActions(['switchPlayState'])
  }
}
</script>