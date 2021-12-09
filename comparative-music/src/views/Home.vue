<template>
  <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12 mt-14>
        <h1>Comparative Music</h1>
        <p>ご利用の方はGoogleアカウントでログインしてください</p>
      </v-flex>

      <v-flex xs12 mt-5>
        <v-btn color='info' @click="login">Googleアカウントでログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>
