<template>
  <v-expansion-panel expand focusable>
    <v-expansion-panel-content>
      <template v-slot:header>
        <v-layout row>
          <img :src="matching.image">
          <v-flex>
            <v-card-title primary-title>
              <h3>{{matching.restaurant}}</h3>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="red" v-if="!matching.participating" @click="matching.participating=true">Participate</v-btn>
              <v-btn flat color="red" v-else @click="matching.participating=false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </template>
      <v-card>
        <v-card-text>
          this is contents
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
img {
  width: 100px;
  height: 100px;
}
</style>
