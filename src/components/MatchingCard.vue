<template>
  <v-layout>
    <v-flex>
      <v-card>
        <!-- <v-img :src="matching.image" height="250px">
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
        </v-slide-y-transition> -->
        <v-card-title primary-title>
          <v-layout row mx-1>
            <v-flex class="headline">
              {{matching.matchingMessage}}
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout column ma-1>
            <v-flex class="content-list">
              <span>글쓴이 : </span><span style="cursor: pointer" class="blue--text text--lighten-1" @click="$router.push({ path: `/profile/${matching.owner}` })">{{matching.owner}} (owner id)</span>
            </v-flex>
            <v-flex class="content-list">
              장소 : {{matching.restaurant}} (restaurant id)
            </v-flex>
            <v-flex class="content-list">
              날짜 : {{matching.since | datetimeToDate}}
            </v-flex>
            <v-flex class="content-list">
              시간 : {{matching.since | datetimeToTime}}
            </v-flex>
            <v-flex class="content-list">
              <span>신청 현황 : </span><span style="cursor: pointer" class="blue--text text--lighten-1">{{matching.requests.length}} / {{matching.maxNumber}}</span>
            </v-flex>
            <v-flex class="content-list">
              상태 : {{matching.status | status}}
            </v-flex>
            <v-flex text-xs-right>
              <v-btn color="primary" v-if="buttonCode() === 0" @click="participate">참가신청</v-btn>
              <v-btn color="primary" disabled v-if="buttonCode() === 1">로그인 후 가능</v-btn>
              <v-btn color="secondary" v-if="buttonCode() === 2" @click="cancelMatching">삭제</v-btn>
              <v-btn color="secondary" v-if="buttonCode() === 3" @click="cancelRequest">참가 취소</v-btn>
              <v-btn color="primary" disabled v-if="buttonCode() === 4">꽉 참</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  props: {
    matching: {
      type: Object
    },
    updateMatchingList: {
      type: Function
    }
  },
  methods: {
    ...mapActions({
      createRequest: 'createRequest',
      deleteMatching: 'deleteMatching',
      deleteMatchingRequest: 'deleteMatchingRequest'
    }),
    async participate () {
      const payload = {
        user: this.user.id,
        matching: this.matching.id,
        requestMessage: '신청합니다'
      }
      await this.createRequest({ payload })
      await this.updateMatchingList()
    },
    async cancelMatching () {
      await this.deleteMatching({ id: this.matching.id })
      await this.updateMatchingList()
    },
    async cancelRequest () {
      const requests = this.matching.requests
      const f = requests.find((element) => {
        return element.user === this.user.id
      })
      await this.deleteMatchingRequest({ id: f.id })
      await this.updateMatchingList()
    },
    buttonCode () {
      if (this.user.id === null) {
        return 1 // login 이후 가능
      } else if (this.user.id === this.matching.owner) {
        return 2 // 본인이 올린 매칭
      } else if (this.matching.selfParticipated) {
        return 3 // 꽉참
      } else if (this.matching.requests.length >= this.matching.maxNumber) {
        return 4 // 이미 본인이 참가함
      } else {
        return 0 // 참가 가능
      }
    }
  },
  filters: {
    datetimeToDate (val) {
      if (val !== undefined) {
        const date = val.split('T')[0]
        return date
      } else {
        return ''
      }
    },
    datetimeToTime (val) {
      if (val !== undefined) {
        let time = val.split('T')[1]
        time = time.split('Z')[0]
        return time
      } else {
        return ''
      }
    },
    status (val) {
      if (val === 1) {
        return '모집중'
      }
    }
  }
}
</script>

<style scoped>
.headline {
  max-height: 40px;
}
.content-list {
  max-height: 30px;
}
</style>
