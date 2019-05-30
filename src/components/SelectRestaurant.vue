<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on" large>Select Restaurant</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Select Restaurant</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs9>
              <v-text-field placeholder="Keywords"></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn color="secondary">Search</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" flat @click="dialog = false">CANCEL</v-btn>
        <v-btn color="blue" flat @click="dialog = false">SELECT</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
