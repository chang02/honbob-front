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
            <v-btn color="warning" dark large to='/matching_register'>매칭 시작하기</v-btn>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
    <v-container id="matching-container" align-center class="mb-4" my-5>
      <v-card color="amber lighten-4">
        <v-toolbar card>
          <i class="material-icons">search</i>
          <v-toolbar-title class="font-weight-light">나에게 맞는 매칭 찾기</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout row>
            <v-flex xs2 mr-1>
              <v-select
                @change="updateMatchingList"
                label="성별"
                v-model="filter.gender"
                :items="[{code:3,text:'Any'},{code:1,text:'Male'},{code:2,text:'Female'}]"
                item-text="text"
                item-value="code"
              />
            </v-flex>
            <v-flex xs2 mr-1>
              <v-text-field @change="updateMatchingList" type="number" label="최대 인원" v-model="filter.maxNumber"></v-text-field>
            </v-flex>
            <v-flex xs4 mr-1>
              <v-text-field @change="updateMatchingList" label="식당 이름" v-model="filter.restaurant"></v-text-field>
            </v-flex>
            <v-flex xs2 mr-1>
              <v-text-field @change="updateMatchingList" label="최소 나이" type="number" v-model="filter.minage" />
            </v-flex>
            <v-flex xs2 mr-1>
              <v-text-field @change="updateMatchingList" label="최대 나이" type="number" v-model="filter.maxage" />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs4 mr-1>
              <v-text-field @change="updateMatchingList" label="시작 시간" type="datetime" v-model="filter.since" />
            </v-flex>
            <v-flex xs4 mr-1>
              <v-text-field @change="updateMatchingList" label="끝 시간" type="datetime" v-model="filter.till" />
            </v-flex>
            <v-flex xs4 mr-1>
              <v-text-field @change="updateMatchingList" label="키워드" v-model="filter.keyword" />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-layout wrap>
        <v-flex xs12 sm6 v-for="(matching,key) in matchingList" v-bind:key="key">
          <matching-card
            class="matching-card ma-3"
            :matching="matching"
            :updateMatchingList="updateMatchingList"
          />
        </v-flex>
      </v-layout>
    </v-container>
    <footer-with-git-hub/>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import MatchingCard from '../components/MatchingCard.vue'
import Toolbar from '../components/Toolbar.vue'
// import FilterOption from '../components/FilterOption.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'

export default {
  components: {
    MatchingCard,
    Toolbar,
    // FilterOption,
    FooterWithGitHub
  },
  data () {
    return {
      matchingList: [],
      filter: {
        restaurant: '',
        gender: 3,
        matchingMessage: '',
        maxNumber: 100,
        minage: 0,
        maxage: 100,
        since: '2010-01-01T01:00:00',
        till: '2100-12-31T23:59:59',
        keyword: ''
      }
    }
  },
  async created () {
    await this.updateMatchingList()
  },
  methods: {
    ...mapActions({
      getMatchingList: 'getMatchingList'
    }),
    async updateMatchingList () {
      this.matchingList = await this.getMatchingList({
        restaurant: this.filter.restaurant,
        gender: this.filter.gender,
        matchingMessage: this.filter.matchingMessage,
        maxNumber: this.filter.maxNumber,
        minage: this.filter.minage,
        maxage: this.filter.maxage,
        since: this.filter.since,
        till: this.filter.till,
        keyword: this.filter.keyword
      })
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
