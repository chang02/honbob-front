<template>
  <div id="login">
    <v-form>
      <v-container>
        <v-layout column>
          <v-flex>
            <h1 class="text-xs-center">Sign up</h1>
            <v-text-field label="Username" v-model="username"></v-text-field>
            <v-text-field label="Password" v-model="password1" type="password"></v-text-field>
            <v-text-field label="Password Confirm" v-model="password2" type="password"></v-text-field>
          </v-flex>
          <v-flex align-center class="text-xs-center">
            <v-btn large @click="register({ username, password1, passwrod2 })"> Sign Up </v-btn>
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
      password1: '',
      password2: ''
    }
  },
  methods: {
    ...mapActions({
      register: 'register'
    })
  }
}
</script>

<style>

</style>
