<template>
  <v-container>
    <div id="blank"></div>
    <v-layout wrap column>
      <v-flex text-xs-center>
        <span class="headline">Matching Registration</span>
      </v-flex>
      <v-flex text-xs-center>
        <select-restaurant></select-restaurant>
      </v-flex>
      <v-container grid-list-md>
        <v-layout>
          <v-flex xs2></v-flex>
          <v-flex xs8>
            <v-container>
              <v-layout wrap column>
                <v-layout row>
                  <v-subheader>Date</v-subheader>
                  <v-select></v-select>
                  <v-subheader>Time</v-subheader>
                  <v-select></v-select>
                </v-layout>
                <v-layout row>
                  <v-subheader>Title</v-subheader>
                  <v-text-field required></v-text-field>
                </v-layout>
                <v-flex>
                  <v-textarea
                    outline
                    label="Simple Introduction"
                    value=""
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn color="red" flat to="/">CLOSE</v-btn>
      <v-btn color="blue" flat to="/">REGISTER</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script>
import SelectRestaurant from '../components/SelectRestaurant.vue'

export default {
  components: {
    SelectRestaurant
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#blank {
  margin-top: 70px;
}
</style>
