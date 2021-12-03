import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBxwfZzyd8cP1cbbfHsyssga7T1o7AOzmo",
  authDomain: "my-address-pj-404e0.firebaseapp.com",
  projectId: "my-address-pj-404e0",
  storageBucket: "my-address-pj-404e0.appspot.com",
  messagingSenderId: "93388205129",
  appId: "1:93388205129:web:398c4e92d1e85ab205e398",
  measurementId: "G-LLHHVJWP5Z"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
