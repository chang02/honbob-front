<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" large>Start Matching</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Matching Information</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Date" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Time" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Restaurants"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Matching Title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-autocomplete
                  :items="['Gangnam', 'Sinchon', 'Gwanghwamun']"
                  label="Locations"
                  multiple
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['20-23', '24-27', '28-31', '32+']"
                  label="Age"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['Males Only', 'Females Only', 'Both']"
                  label="Gender"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style>

</style>
