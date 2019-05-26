<template>
  <v-layout column>
    <toolbar />
    <v-card>
      <v-img :src="require('../assets/foods.jpg')" id="front-image" aspect-ratio="4"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
        <v-container fluid>
          <v-layout column align-center class="text-xs-center">
            <v-flex>
              <h1 id="main-message">BOB TOGETHER</h1>
            </v-flex>
            <v-btn color="primary" dark large to='/matching_register'>Start Matching</v-btn>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-container id="matching-container" align-center class="mb-4">
      <filter-option />
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12 sm6 v-for="matching in matchingList" v-bind:key="matching.restaurant">
            <matching-card
              class="matching-card"
              :matching="matching"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <footer-with-git-hub/>
  </v-layout>
</template>

<script>
import MatchingCard from '../components/MatchingCard.vue'
import Toolbar from '../components/Toolbar.vue'
import FilterOption from '../components/FilterOption.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'

export default {
  components: {
    MatchingCard,
    Toolbar,
    FilterOption,
    FooterWithGitHub
  },
  data () {
    return {
      matchingList: [
        {
          restaurant: 'Nine Ounce',
          participating: false,
          image: require('@/assets/nineounce.jpg'),
          show: false
        },
        {
          restaurant: 'eggthumb',
          participating: false,
          image: require('@/assets/eggthumb.jpg'),
          show: false
        },
        {
          restaurant: 'tendong',
          participating: false,
          image: require('@/assets/tendong.jpg'),
          show: false
        }
      ]
    }
  }
}
</script>

<style>
  #front-image {
      top: 24px;
  }
  #main-message {
    font-size: 100px;
    color: white;
    margin-top: 80px;
  }
</style>
