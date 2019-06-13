<template>
  <v-container>
    <v-dialog persistent max-width="600px" v-model="selectRestaurant">
      <v-card>
        <v-card-title>
          <span class="headline">식당을 선택하세요</span>
        </v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs9>
              <v-text-field placeholder="Keywords" v-model="restaurantKeyword"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn color="secondary" @click="search">Search</v-btn>
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
          <v-btn color="red" flat @click="selectRestaurant=false">CANCEL</v-btn>
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
                <v-subheader>식사 장소</v-subheader>
                <v-text-field readonly :value="selectedRestaurant.name"></v-text-field>
                <v-btn color="primary" dark @click="selectRestaurant=true" large>식당 찾아보기</v-btn>
              </v-layout>
              <v-layout row>
                <v-subheader>식사 일시</v-subheader>
                <v-text-field type="datetime-local" v-model="date" />
              </v-layout>
              <v-layout row>
                <v-subheader>식사 인원</v-subheader>
                <v-text-field type="number" required v-model="total" />
              </v-layout>
              <v-layout row>
                <v-subheader>키워드</v-subheader>
                <v-text-field v-model="keyword" />
              </v-layout>
              <v-flex>
                <v-textarea
                  outline
                  label="하고 싶은 말"
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
      <v-btn color="error" to="/">나가기</v-btn>
      <v-btn color="success" @click="register">등록하기</v-btn>
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
      total: 0,
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
