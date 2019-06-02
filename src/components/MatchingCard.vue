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
              글쓴이 : {{matching.owner}} (owner id)
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
              신청 현황 : {{matching.requests.length}} / {{matching.maxNumber}}
            </v-flex>
            <v-flex class="content-list">
              상태 : {{matching.status}} (status code)
            </v-flex>
            <v-flex text-xs-right>
              <v-btn color="primary" v-if="participatable()" @click="participate">participate</v-btn>
              <v-btn color="primary" disabled v-else>participate</v-btn>
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
      createRequest: 'createRequest'
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
    participatable () {
      if (this.user.id !== null && this.user.id !== this.matching.owner && this.matching.requests.length < this.matching.maxNumber) {
        return true
      }
      return false
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
