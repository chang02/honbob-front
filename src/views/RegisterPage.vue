<template>
  <div>
    <toolbar />
    <v-layout align-center>
      <v-flex id="register-box" xs3>
        <register></register>
      </v-flex>
    </v-layout>
    <footer-with-git-hub />
  </div>
</template>

<script>
import Register from '../components/Register.vue'
import Toolbar from '../components/Toolbar.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'

export default {
  components: {
    Register,
    Toolbar,
    FooterWithGitHub
  }
}
</script>

<style>
  #register-box {
    position: relative;
    top: 100px;
    margin: auto;
  }
</style>
