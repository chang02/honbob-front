<template>
  <v-layout py-5>
    <toolbar />
    <v-container id="mypage-container">
      <v-layout justify-center px-5>
        <v-flex xs12>
          <v-card class="py-4 px-5" flat>
            <v-card flat class="info-title">
              Base Profile
            </v-card>
            <v-layout row wrap justify-space-between pt-4>
              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute"><span>Name</span></v-flex>
                  <v-text-field xs12 readonly box v-model="profile.name" />
                </v-layout>
              </v-flex>

              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute"><span>Gender</span></v-flex>
                  <v-text-field xs12 readonly box v-if="profile.gender===1" value="Male" />
                  <v-text-field xs12 readonly box v-if="profile.gender===2" value="Female" />
                </v-layout>
              </v-flex>

              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute">Age</v-flex>
                  <v-text-field xs12 readonly box v-model="profile.age" />
                </v-layout>
              </v-flex>

              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute">School</v-flex>
                  <v-text-field xs12 readonly box v-model="profile.school" />
                </v-layout>
              </v-flex>

              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute">Major</v-flex>
                  <v-text-field xs12 readonly box v-model="profile.major" />
                </v-layout>
              </v-flex>

              <v-flex xs5>
                <v-layout column>
                  <v-flex xs12 class="attribute">Phone</v-flex>
                  <v-text-field xs12 readonly box v-model="profile.contact" />
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout column>
                  <v-flex xs12 class="attribute"><span>Description</span></v-flex>
                  <v-text-field xs12 readonly box v-model="profile.description" />
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <footer-with-git-hub/>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
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
      id: this.$route.params.id,
      profile: {},
    }
  },
  computed: {
  },
  async created () {
    this.profile = await this.getProfile({ id: this.id })
  },
  methods: {
    ...mapActions({
      getProfile: 'getProfile'
    }),
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
