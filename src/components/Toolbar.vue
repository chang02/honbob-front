<template>
  <v-toolbar fixed>
    <v-toolbar-title>
      <router-link to="/">
        <img src="..\assets\rice.png" id="honbob-icon">
      </router-link>
      HONBOB
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat to="/login"> Sign In </v-btn>
      <v-btn to="/mypage" flat> My page </v-btn>
      <v-menu :close-on-content-click="false" offset-y :nudge-width="250">
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
export default {
  data () {
    return {
      alarms: [
        {
          note: '2 people newly joined in my dinner group',
          time: '2019-05-04 14:30'
        },
        {
          note: 'The appointment is cancelled',
          time: '2019-05-03 19:05'
        }
      ]
    }
  }
}
</script>

<style>
#honbob-icon {
  width: 25px;
  height: 25px;
}
</style>
