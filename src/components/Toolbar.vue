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
              <template v-slot:badge v-bind="myNotifications">
                {{myNotifications.length}}
              </template>
            </v-badge>
          </v-btn>
        </template>
        <v-card>
          <v-layout column>
            <v-flex pa-3 class="noti-message" v-for="(notification, key) in myNotifications.slice().reverse()" :key="key">
              <v-layout>
                <v-flex xs11 pt-1>
                  {{notification.message}}
                </v-flex>
                <v-flex xs1>
                  <v-icon style="cursor:pointer" @click="del(notification)">
                    delete_forever
                  </v-icon>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
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
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'myNotifications'
    ])
  },
  methods: {
    ...mapActions({
      logout: 'logout',
      deleteNotification: 'deleteNotification',
      getMyProfile: 'getMyProfile'
    }),
    async del (notification) {
      await this.deleteNotification({ id: notification.id })
      await this.getMyProfile()
    }
  }
}
</script>

<style>
#honbob-icon {
  width: 25px;
  height: 25px;
}
.noti-message {
  font-size: 13px;
}
</style>
