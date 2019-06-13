<template>
  <v-container>
    <v-dialog persistent max-width="600px" v-model="selectRestaurant">
      <v-card>
        <v-card-title>
          <span class="headline">식당 검색</span>
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs9>
              <v-text-field placeholder="Keywords" v-model="restaurantKeyword"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn color="secondary" @click="search">검색</v-btn>
            </v-flex>
          </v-layout>
          <v-layout column>
            <span v-for="(res, key) in restaurantList" v-bind:key="key" @click="selectedRestaurant=res;selectRestaurant=false;" style="cursor:pointer">
              {{res.name}}
            </span>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="selectRestaurant=false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout wrap column my-5>
      <v-flex text-xs-center>
        <div id="page-title"><h4>매칭 등록하기</h4></div>
      </v-flex>
      <v-container grid-list-md>
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs8>
            <v-layout wrap column>
              <v-layout row>
                <v-text-field label="식당" readonly :value="selectedRestaurant.name"></v-text-field>
                <v-btn color="primary" dark @click="selectRestaurant=true" large>식당 검색</v-btn>
              </v-layout>
              <v-layout row>
                <v-text-field label="날짜, 시간" type="datetime-local" v-model="date" />
              </v-layout>
              <v-layout row>
                <v-flex xs3>
                  <v-text-field label="모집 인원" type="number" required v-model="total" />
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="최소 나이" type="minage" required v-model="minage" />
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="최대 나이" type="maxage" required v-model="maxage" />
                </v-flex>
                <v-flex xs3>
                  <v-select
                    label="성별"
                    v-model="gender"
                    :items="[{code:3,text:'상관 없음'},{code:1,text:'남자'},{code:2,text:'여자'}]"
                    item-text="text"
                    item-value="code"
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-text-field label="키워드" v-model="keyword" />
              </v-layout>
              <v-flex>
                <v-textarea
                  outline
                  label="간단 소개"
                  value=""
                  v-model="matchingMessage"
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout id="submit-buttons">
      <v-spacer></v-spacer>
      <v-btn color="error" to="/">닫기</v-btn>
      <v-btn color="success" @click="register">등록</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      selectRestaurant: false,
      selectedRestaurant: {},
      restaurantList: [],
      restaurantKeyword: '',
      date: '',
      total: 1,
      minage: 0,
      maxage: 50,
      gender: 3,
      keyword: '',
      matchingMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions({
      getRestaurantList: 'getRestaurantList',
      createMatching: 'createMatching'
    }),
    async search () {
      this.restaurantList = await this.getRestaurantList({ name: this.restaurantKeyword })
    },
    async register () {
      const payload = {
        owner: this.user.id,
        restaurant: this.selectedRestaurant.id,
        since: this.date,
        till: this.date,
        matchingMessage: this.matchingMessage,
        keyword: this.keyword,
        maxNumber: parseInt(this.total),
        minage: parseInt(this.minage),
        maxage: parseInt(this.maxage),
        gender: parseInt(this.gender),
        status: 1
      }
      this.createMatching({ payload })
    }
  }
}
</script>

<style scoped>
#submit-buttons {
  padding-bottom: 50px;
}
#page-title {
  padding-top: 40px;
  font-size: 25px;
}
</style>
