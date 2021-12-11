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
      <v-col
        v-for="n in songImages.length"
        :key="n"
        class="d-flex child-flex"
        cols="4" sm="3" md="2"
        @click="switchDialog"
      >
        <v-img
          :src="songImages[n-1]"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
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
      songImages: [
        'song-images/create-song.jpg','song-images/piano_and_cat.jpg','song-images/two_cats.jpg','song-images/walk_on_piano.jpeg',
      ]
    }
  },
  methods: {
    ...mapActions(['switchDialog'])
  }
}
</script>