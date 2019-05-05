<template>
  <div>
    <toolbar />
    <v-layout align-center>
      <v-flex id="login-box" xs3>
        <login></login>
      </v-flex>
    </v-layout>
    <footer-with-git-hub />
  </div>
</template>

<script>
import Login from '../components/Login.vue'
import Toolbar from '../components/Toolbar.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'

export default {
  components: {
    Login,
    Toolbar,
    FooterWithGitHub
  }
}
</script>

<style>
  #login-box {
    position: relative;
    top: 100px;
    margin: auto;
  }
</style>
