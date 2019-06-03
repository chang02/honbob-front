<template>
  <div>
    <v-layout row style="height:calc(100vh - 48px)">
      <v-flex xs12 sm8>
        <v-img :src="require('../assets/meal2.jpg')" aspect-ratio="1.5"
        gradient="to top right, rgba(140,185,211,.33), rgba(25,32,72,.7)" style="height:100%;">
          <v-layout column justify-center align-center>
            <img src='../assets/rice-white.png' id="logo">
            <h1 id="entrance-title" class="text-xs-center"> BOB TOGETHER </h1>
            <h2 id="entrance-intro" class="text-xs-center"> simple intro </h2>
          </v-layout>
        </v-img>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm3>
        <login id="login-box"></login>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
    <footer-with-git-hub />
  </div>
</template>

<script>
import FooterWithGitHub from '../components/FooterWithGitHub.vue'
import Login from '../components/Login.vue'

export default {
  components: {
    FooterWithGitHub,
    Login
  }
}
</script>

<style>
  #entrance-title {
    font-size: 90px;
    color: white;
  }
  #entrance-intro {
    font-size: 50px;
    color: white;
  }
  #login-box {
    margin-top: 150px;
  }
  #logo {
    margin-top: 100px;
    width: 130px;
  }
</style>
