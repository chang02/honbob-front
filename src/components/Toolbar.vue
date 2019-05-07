<template>
  <v-toolbar fixed>
    <v-toolbar-title>
      <router-link to="/">
        <img src="../assets/rice.png" id="honbob-icon">
      </router-link>
      BOB TOGETHER
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/login" v-if="user.id === null"> Sign In </v-btn>
      <v-btn flat to="/register" v-if="user.id === null"> Sign Up </v-btn>
      <v-btn to="/mypage" flat v-if="user.id !== null"> My page </v-btn>
      <v-btn flat @click="logout" v-if="user.id !== null"> Log Out </v-btn>
      <v-menu :close-on-content-click="false" offset-y :nudge-width="250" v-if="user.id !== null">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-badge>
              Alarms
              <template v-slot:badge v-bind="alarms">
                {{alarms.length}}
              </template>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-tile v-for="alarm in alarms" :key="alarm.note">
              <v-layout column>
                <v-list-tile-title>
                  {{alarm.note}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{alarm.time}}
                </v-list-tile-sub-title>
                <v-divider></v-divider>
              </v-layout>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      alarms: [
        {
          note: '2 people newly joined in my dinner group.',
          time: '2019-05-04 14:30'
        },
        {
          note: 'My appointment was cancelled.',
          time: '2019-05-03 19:05'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style>
#honbob-icon {
  width: 25px;
  height: 25px;
}
</style>
