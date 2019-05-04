<template>
  <v-layout column>
    <toolbar />
    <v-card>
      <v-img :src="require('../assets/foods.jpg')" id="front-image" aspect-ratio="4"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
        <v-container fill-height fluid>
          <v-layout fill-height align-center>
            <v-flex class="text-xs-center">
              <h1 id="main-message">HONBOB</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-container id="matching-container" align-center>
      <filter-option />
      <v-layout column>
        <v-flex v-for="matching in matchingList" v-bind:key="matching.restaurant">
          <matching-card
            class="matching-card"
            :matching="matching"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import MatchingCard from '../components/MatchingCard.vue'
import Toolbar from '../components/Toolbar.vue'
import FilterOption from '../components/FilterOption.vue'

export default {
  components: {
    MatchingCard,
    Toolbar,
    FilterOption
  },
  data () {
    return {
      matchingList: [
        {
          restaurant: 'Nine Ounce',
          participating: false,
          image: require('@/assets/nineounce.jpg')
        },
        {
          restaurant: 'eggthumb',
          participating: false,
          image: require('@/assets/eggthumb.jpg')
        },
        {
          restaurant: 'tendong',
          participating: false,
          image: require('@/assets/tendong.jpg')
        }
      ]
    }
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
  .matching-card {
    margin-bottom: 10px;
  }
</style>
