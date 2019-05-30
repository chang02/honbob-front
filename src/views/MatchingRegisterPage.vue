<template>
  <div>
    <toolbar />
    <matching-register id="register-form" />
    <footer-with-git-hub />
  </div>
</template>

<script>
import Toolbar from '../components/Toolbar.vue'
import MatchingRegister from '../components/MatchingRegister.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'

export default {
  components: {
    Toolbar,
    MatchingRegister,
    FooterWithGitHub
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
