<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-img :src= "matching.image" height="250px">
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{matching.restaurant}}</div>
            <span class="grey--text">matching info</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn icon @click="matching.show = !matching.show">
            <v-icon>{{ matching.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="blue" v-if="!matching.participating" @click="matching.participating=true">Participate</v-btn>
          <v-btn flat color="red" v-else @click="matching.participating=false">Cancel</v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="matching.show">
            Introduction
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    matching: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
