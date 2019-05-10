<template>
  <div id="login">
    <v-form>
      <v-container>
        <v-layout column>
          <v-flex>
            <h1 class="text-xs-center">SIGN IN</h1>
            <v-text-field label="Username" v-model="username"></v-text-field>
            <v-text-field label="Password" v-model="password" type="password"></v-text-field>
          </v-flex>
          <v-flex align-center class="text-xs-center">
            <v-btn large @click="login({ username, password })"> SIGN IN </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'login'
    })
  }
}
</script>

<style>

</style>
