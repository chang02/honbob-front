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
                  Account
                </v-card>
                <v-layout row wrap justify-space-between pt-4>
                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>Username</span></v-flex>
                      <v-text-field xs12 readonly box v-model="user.username"></v-text-field>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  Base Profile
                </v-card>
                <v-layout row wrap justify-space-between pt-4>
                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>Name</span></v-flex>
                      <v-text-field xs12 v-model="newProfile.name" v-if="editing==0" placeholder="Name" />
                      <v-text-field xs12 readonly box v-model="profile.name" v-else/>
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>Gender</span></v-flex>
                      <v-select
                        v-if="editing==0"
                        v-model="newProfile.gender"
                        :items="[{code:1,text:'Male'},{code:2,text:'Female'}]"
                        item-text="text"
                        item-value="code"
                      />
                      <v-text-field xs12 readonly box v-if="editing==-1&&profile.gender===1" value="Male" />
                      <v-text-field xs12 readonly box v-if="editing==-1&&profile.gender===2" value="Female" />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">Age</v-flex>
                      <v-text-field xs12 v-model="newProfile.age" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.age" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">School</v-flex>
                      <v-text-field xs12 v-model="newProfile.school" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.school" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">Major</v-flex>
                      <v-text-field xs12 v-model="newProfile.major" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.major" v-else />
                    </v-layout>
                  </v-flex>

                  <v-flex xs5>
                    <v-layout column>
                      <v-flex xs12 class="attribute">Phone</v-flex>
                      <v-text-field xs12 v-model="newProfile.contact" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.contact" v-else />
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout column>
                      <v-flex xs12 class="attribute"><span>Description</span></v-flex>
                      <v-text-field xs12 v-model="newProfile.description" v-if="editing==0" />
                      <v-text-field xs12 readonly box v-model="profile.description" v-else />
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-btn v-if="editing!=0" @click="editing=0">edit</v-btn>
                <v-btn v-else @click="confirm">confirm</v-btn>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="py-4 px-5" flat>
                <v-card flat class="info-title">
                  내가 올린 매칭
                </v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm5 mr-3 my-3 v-for="(myMatching, key) in myMatchings" v-bind:key="key">
                    <matching-card
                      class="matching-card"
                      :matching="myMatching"
                    />
                  </v-flex>
                </v-layout>
                <v-card flat class="info-title">
                  내가 참가한 매칭
                </v-card>
                <v-layout row wrap>
                  <!-- <v-flex xs12 sm5 mr-3 my-3 v-for="(myRequest, key) in myRequests" v-bind:key="key">
                    <matching-card
                      class="matching-card"
                      :matching="myRequest"
                    />
                  </v-flex> -->
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
import { mapActions, mapGetters } from 'vuex'
import * as _ from 'lodash'
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
      newProfile: {},
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
  },
  computed: {
    ...mapGetters({
      user: 'user',
      profile: 'profile',
      myMatchings: 'myMatchings',
      myRequests: 'myRequests'
    })
  },
  async created () {
    await this.getMyProfile()
    this.newProfile = _.cloneDeep(this.profile)
  },
  methods: {
    ...mapActions({
      getMyProfile: 'getMyProfile',
      updateProfile: 'updateProfile'
    }),
    async confirm () {
      const payload = {
        age: this.newProfile.age,
        contact: this.newProfile.contact,
        description: this.newProfile.description,
        gender: this.newProfile.gender,
        major: this.newProfile.major,
        name: this.newProfile.name,
        school: this.newProfile.school
      }
      await this.updateProfile({ id: this.newProfile.user, payload })
      this.editing = -1
    }
  },
  filters: {
    gender: function (value) {
      if (value === 1) {
        return 'Male'
      } else if (value === 2) {
        return 'Female'
      }
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
