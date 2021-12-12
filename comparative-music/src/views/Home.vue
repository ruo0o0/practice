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
      <v-col @click="switchDialog" class="d-flex child-flex" cols="4" sm="3" md="2">
        <v-img
          :src="create"
          aspect-ratio="1"
          class="grey lighten-2"
        >
        </v-img>
      </v-col>
      <v-col
        v-for="(music, index) in album"
        :key="index"
        class="d-flex child-flex"
        cols="4" sm="3" md="2"
      >
        <v-img
          :lazy-src="music.image_url"
          :src="music.image_url"
          aspect-ratio="1"
          class="grey lighten-2"
          @mouseover="mouseHover(index)"
          @mouseleave="mouseLeave"
        >
          <template>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-icon x-large v-show="hoverFlag && index === hoverIndex" @mouseover="mouseHover(index)" @mouseleave="mouseLeave">mdi-play-circle-outline</v-icon>
            </v-row>
          </template>
        </v-img>
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
      album: []
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
    ...mapActions(['switchDialog'])
  }
}
</script>

<style lang="scss" scoped>
  // .v-image {
  //   outline: solid 3px rgba(10, 100, 136, 0.568);
  // }
</style>