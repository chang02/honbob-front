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
            <matching-register-form/>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-container id="matching-container" align-center>
      <filter-option />
      <v-layout row>
        <v-layout column>
          <v-flex v-for="matching in matchingList" v-bind:key="matching.restaurant">
            <matching-card
              class="matching-card"
              :matching="matching"
            />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import MatchingCard from '../components/MatchingCard.vue'
import Toolbar from '../components/Toolbar.vue'
import FilterOption from '../components/FilterOption.vue'
import MatchingRegisterForm from '../components/MatchingRegisterForm.vue'

export default {
  components: {
    MatchingCard,
    Toolbar,
    FilterOption,
    MatchingRegisterForm
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
  .matching-card {
    margin-bottom: 10px;
  }
</style>
