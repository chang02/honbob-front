<template>
  <v-layout column>
    <toolbar></toolbar>
    <v-card>
      <v-img :src="require('../assets/foods.jpg')" id="front-image" aspect-ratio="4"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
        <v-container fill-height fluid>
          <v-layout fill-height align-center>
            <v-flex class="text-xs-center">
              <h1 id="main-message">BOB TOGETHER</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-container id="matching-system" align-center>
      <filter-option></filter-option>
      <matching-list></matching-list>
    </v-container>
  </v-layout>
</template>

<script>
import MatchingList from '../components/MatchingList.vue'
import Toolbar from '../components/Toolbar.vue'
import FilterOption from '../components/FilterOption.vue'

export default {
  components: {
    MatchingList,
    Toolbar,
    FilterOption
  }
}
</script>

<style>
  #front-image {
      top: 20px;
  }
  #main-message {
    font-size: 100px;
    color: white;
  }
</style>
