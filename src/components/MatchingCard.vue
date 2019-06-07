<template>
  <v-layout>
    <v-dialog class="requests-dialog" max-width="400" v-model="openRequestsDialog">
      <v-card class="py-2">
        <v-card-title>
          <v-flex headline text-xs-center>신청자 목록</v-flex>
        </v-card-title>
        <v-card-text>
          <v-layout row justify-center v-for="(request, key) in matching.requests" v-bind:key="key">
            <v-flex xs6 py-2 body-1 text-xs-center blue--text style="cursor:pointer;" @click="$router.push({ path: `/profile/${request.user}` })">
              {{request.user}} (user id)
            </v-flex>
            <v-flex xs3 v-if="buttonCode2(request) === 2">
              <v-btn color="primary" small @click="accept(request)">수락</v-btn>
            </v-flex>
            <v-flex xs3 v-if="buttonCode2(request) === 2">
              <v-btn color="secondary" small @click="decline(request)">거절</v-btn>
            </v-flex>
            <v-flex xs4 v-if="buttonCode2(request) === 3">
              <v-btn color="secondary" small @click="cancelAccept(request)">수락 취소</v-btn>
            </v-flex>
            <v-flex xs4 v-if="buttonCode2(request) === 4">
              <v-btn color="secondary" disabled small>수락 대기중</v-btn>
            </v-flex>
            <v-flex xs4 v-if="buttonCode2(request) === 4">
              <v-btn color="secondary" small @click="cancelRequest(request)">참가 취소</v-btn>
            </v-flex>
            <v-flex xs4 v-if="buttonCode2(request) === 5">
              <v-btn color="secondary" disabled small>수락됨</v-btn>
            </v-flex>
            <v-flex xs4 v-if="buttonCode2(request) === 5">
              <v-btn color="secondary" small @click="cancelRequest(request)">참가 취소</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container fluid grid-list-md>
      <template class="content-list">
        <v-flex xs12 sm12>
          <v-hover>
            <v-card color="blue-grey lighten-4" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 5}`">
              <v-card-title>
                <h4>
                  {{matching.matchingMessage}}
                  <span :class="`${statusColor()}--text`">({{matching.status | status}})</span>
                </h4>
                <v-spacer></v-spacer>
                #{{matching.keyword}}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>글쓴이 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span style="cursor: pointer" class="blue--text" @click="$router.push({ path: `/profile/${matching.owner.user}` })">{{matching.owner.name}}</span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>장소 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{matching.restaurant.name}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>식사 일시 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{matching.since | datetimeToDate}} {{matching.since | datetimeToTime}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>나이 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{matching.minage}} - {{matching.maxage}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>선호 성별 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    {{matching.gender | genderFilter}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>신청 현황 </v-list-tile-content>
                  <v-list-tile-content class="align-end">
                    <span style="cursor: pointer" class="blue--text" @click="openRequestsDialog=true">{{matching.requests.length}} / {{matching.maxNumber}} </span>
                  </v-list-tile-content>
                </v-list-tile>
                <v-flex text-xs-right>
                <v-btn color="primary" v-if="buttonCode() === 0" @click="participate">참가신청</v-btn>
                <v-btn color="primary" disabled v-if="buttonCode() === 1">로그인 후 가능</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 2.1" @click="completeRecruit">모집완료하기</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 2.1" @click="cancelMatching">삭제</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 2.2" @click="cancelCompleteRecruit">모집완료취소</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 3" disabled>수락 대기중</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 3" @click="cancelRequest">참가 취소</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 4" disabled>수락됨</v-btn>
                <v-btn color="secondary" v-if="buttonCode() === 4" @click="cancelRequest">참가 취소</v-btn>
                <v-btn color="primary" disabled v-if="buttonCode() === 5">꽉 참</v-btn>
                <v-btn color="primary" disabled v-if="buttonCode() === 6">모집 마감됨</v-btn>
              </v-flex>
              </v-list>
            </v-card>
          </v-hover>
        </v-flex>
      </template>
    </v-container>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      openRequestsDialog: false
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
      patchMatching: 'patchMatching',
      deleteMatching: 'deleteMatching',
      deleteMatchingRequest: 'deleteMatchingRequest',
      patchMatchingRequest: 'patchMatchingRequest',
      getMyProfile: 'getMyProfile'
    }),
    async participate () {
      if (this.matching.status !== 1) {
        alert('참가 신청을 할 수 없는 상태입니다')
        return
      }
      const payload = {
        user: this.user.id,
        matching: this.matching.id,
        requestMessage: '신청합니다'
      }
      await this.createRequest({ payload })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async cancelMatching () {
      await this.deleteMatching({ id: this.matching.id })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async completeRecruit () {
      const requests = this.matching.requests
      const f = requests.find((element) => {
        return element.status === 1
      })
      if (f !== undefined) {
        alert('수락하지 않은 요청이 있습니다')
        return
      }
      const payload = {
        status: 2
      }
      await this.patchMatching({ id: this.matching.id, payload })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async cancelCompleteRecruit () {
      const payload = {
        status: 1
      }
      await this.patchMatching({ id: this.matching.id, payload })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async cancelRequest () {
      if (this.matching.status !== 1) {
        alert('참가 취소를 할 수 없는 상태입니다')
        return
      }
      const requests = this.matching.requests
      const f = requests.find((element) => {
        return element.user === this.user.id
      })
      await this.deleteMatchingRequest({ id: f.id })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async accept (request) {
      const payload = {
        status: 2
      }
      await this.patchMatchingRequest({ id: request.id, payload })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async decline (request) {
      await this.deleteMatchingRequest({ id: request.id })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    async cancelAccept (request) {
      if (this.matching.status !== 1) {
        alert('수락을 취소할 수 없는 상태입니다')
        return
      }
      const payload = {
        status: 1
      }
      await this.patchMatchingRequest({ id: request.id, payload })
      try {
        await this.updateMatchingList()
      } catch {
        await this.getMyProfile()
      }
    },
    buttonCode () {
      if (this.user.id === null) {
        return 1 // login 이후 가능
      } else if (this.user.id === this.matching.owner.user) {
        if (this.matching.status === 1) {
          return 2.1 // 본인이 올린 매칭, 모집완료 전
        } else if (this.matching.status === 2) {
          return 2.2 // 모집완료 후
        }
      } else if (this.matching.selfParticipated && !this.matching.accepted) {
        return 3 // 이미 본인이 참가함, 수락 전
      } else if (this.matching.selfParticipated && this.matching.accepted) {
        return 4 // 이미 본인이 참가함, 수락 후
      } else if (this.matching.requests.length >= this.matching.maxNumber) {
        return 5 // 꽉참
      } else {
        return 0 // 참가 가능
      }
    },
    buttonCode2 (request) {
      if (this.user.id === null) {
        return 1 // login 이후 가능
      } else if (this.user.id === this.matching.owner.user) {
        // 본인이 올린 매칭
        if (request.status === 1) {
          return 2 // 수락 가능한 상태
        } else {
          return 3 // 이미 수락한 상태
        }
      } else {
        if (request.user === this.user.id) {
          if (request.status === 1) {
            return 4 // 매칭 신청 취소 할 수 있는 상태, 수락 대기중
          } else {
            return 5 // 매칭 신청 취소 할 수 있는 상태, 수락됨
          }
        } else {
          return 6 // 그냥 나머지
        }
      }
    },
    statusColor () {
      if (this.matching.status === 1) {
        return 'green'
      } else if (this.matching.status === 2) {
        return 'red'
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
      } else if (val === 2) {
        return '모집 완료됨'
      }
    },
    genderFilter (val) {
      if (val === 1) {
        return '남성'
      } else if (val === 2) {
        return '여성'
      } else {
        return '상관 없음'
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
/* .requests-dialog {
  width: 500px;
  height: 300px;
} */
</style>
