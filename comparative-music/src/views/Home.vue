<template>
  <v-container>
    <v-row>
      <v-col cols=8>
        <v-text-field
        label="曲名・アーティスト名"
        type="text"
        class="mt-16"
        >
        <template v-slot:append-outer>
        <v-btn>検索</v-btn>
        </template>
        </v-text-field>
      </v-col>
      <v-col class="mt-16">
        <div align="center" class="mt-4">
          <v-btn>比較・鑑賞</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col @click="switchDialog" class="child-flex pa-2" cols="4" sm="3" md="2">
        <v-img
          :src="create"
          aspect-ratio="1"
          class="grey lighten-2"
        >
        </v-img>
        <p></p>
      </v-col>
      <v-col
        v-for="(music, index) in album"
        :key="index"
        class=" child-flex pa-2"
        cols="4" sm="3" md="2"
      >
        <v-img
          :lazy-src="music.image_url"
          :src="music.image_url"
          aspect-ratio="1"
          class="grey lighten-2"
          @mouseover="mouseHover(index)"
          @mouseleave="mouseLeave"
          @click.right.prevent="switchDialogUpdate(); setMusicTemp(music)"
        >
          <template>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-btn icon @click="play(music)" v-if="hoverFlag && index === hoverIndex">
                <v-icon x-large @mouseover="mouseHover(index)" @mouseleave="mouseLeave" >mdi-play-circle-outline</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-img>
        <p class="text-caption ma-0 mt-1">{{ music.artist }}</p>
        <p class="text-caption ma-0">{{ music.title }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      create: 'song-images/create-song.jpg',
      hoverFlag: false,
      album: [],
      audio: new Audio(),
    }
  },
  created () {
    this.album = this.$store.state.album
  },
  methods: {
    mouseHover (index) {
      this.hoverFlag = true
      this.hoverIndex = index
    },
    mouseLeave () {
      this.hoverFlag = false
    },
    play (music) {
      this.switchBarContent(music)
      this.switchPlayerBar()
    },
    ...mapActions(['switchDialog','switchDialogUpdate','setMusicTemp','switchPlayerBar','switchBarContent'])
  }
}
</script>

<style lang="scss" scoped>
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>