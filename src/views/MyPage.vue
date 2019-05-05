<template>
  <v-layout py-5>
    <toolbar />
    <v-container id="mypage-container">
      <v-layout justify-center px-5>
        <v-flex xs12>
          <v-tabs v-model="tab" centered light>
            <v-tab>profile</v-tab>
            <v-tab>my matching</v-tab>
            <v-tab-item>
              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  account
                </v-card>
                <v-layout row wrap justify-space-between pt-4>
                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>username</span></v-flex>
                      <v-text-field xs12 readonly box v-model="profile.username"></v-text-field>
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">email</v-flex>
                      <v-text-field xs12 readonly box v-model="profile.email"></v-text-field>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  base profile
                </v-card>
                <v-layout row wrap justify-space-between pt-4>
                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>gender</span></v-flex>
                      <v-text-field xs12 v-model="profile.gender" v-if="editing==0" placeholder="Male/Female" />
                      <v-text-field xs12 readonly box v-model="profile.gender" v-else/>
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">age</v-flex>
                      <v-text-field xs12 v-model="profile.age" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.age" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">workplace</v-flex>
                      <v-text-field xs12 v-model="profile.workplace" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.workplace" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">phone</v-flex>
                      <v-text-field xs12 v-model="profile.phone" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.phone" v-else />
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-btn v-if="editing!=0" @click="editing=0">edit</v-btn>
                <v-btn v-else @click="editing=-1">confirm</v-btn>
              </v-card>

              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  introude
                </v-card>
                <v-layout column justify-space-between pt-4>
                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>description</span></v-flex>
                      <v-text-field xs12 v-model="profile.description" v-if="editing==1" />
                      <v-text-field xs12 readonly box v-model="profile.description" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">detail</v-flex>
                      <v-textarea xs12 v-model="profile.detail" v-if="editing==1" />
                      <v-textarea xs12 readonly box v-model="profile.detail" v-else />
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-btn v-if="editing!=1" @click="editing=1">edit</v-btn>
                <v-btn v-else @click="editing=-1">confirm</v-btn>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  my proposal
                </v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm5 mr-3 my-3 v-for="matching in myProposal" v-bind:key="matching.restaurant">
                    <matching-card
                      class="matching-card"
                      :matching="matching"
                    />
                  </v-flex>
                </v-layout>
                <v-card flat class="info-title">
                  my join
                </v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm5 mr-3 my-3 v-for="matching in myJoin" v-bind:key="matching.restaurant">
                    <matching-card
                      class="matching-card"
                      :matching="matching"
                    />
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
    <footer-with-git-hub/>
  </v-layout>
</template>

<script>
import Toolbar from '../components/Toolbar.vue'
import FooterWithGitHub from '../components/FooterWithGitHub.vue'
import MatchingCard from '../components/MatchingCard.vue'

export default {
  components: {
    Toolbar,
    FooterWithGitHub,
    MatchingCard
  },
  data () {
    return {
      tab: 0,
      editing: -1,
      profile: {
        username: 'test-username',
        email: 'test-email',
        gender: 'Male',
        age: 25,
        workplace: 'SNU',
        phone: '010-1234-5678',
        description: '안녕하세요 저는~~~~',
        detail: '서울에 거주하며 서울대학교를 다니고있고...~~'
      },
      myProposal: [
        {
          restaurant: 'Nine Ounce',
          participating: true,
          image: require('@/assets/nineounce.jpg'),
          show: false
        }
      ],
      myJoin: [
        {
          restaurant: 'eggthumb',
          participating: true,
          image: require('@/assets/eggthumb.jpg'),
          show: false
        },
        {
          restaurant: 'tendong',
          participating: true,
          image: require('@/assets/tendong.jpg'),
          show: false
        }
      ]
    }
  }
}
</script>

<style scoped>
#mypage-container{
  width: 100%;
}
.info-title{
  font-size: 25px;
}
.attribute{
  height: 30px;
  font-size: 16px;
}
</style>
