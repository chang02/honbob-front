<template>
  <v-container grid-list-xs>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 md1>
        <v-subheader v-text="'Gender'"></v-subheader>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-select v-model="matchingGenders" :items="genders" label="Select" multiple>
        </v-select>
      </v-flex>
      <v-flex xs12 sm6 md1>
        <v-subheader v-text="'Location'"></v-subheader>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-select v-model="targetLocations" :items="locations" label="Select" multiple>
        </v-select>
      </v-flex>
      <v-container>
        <v-layout row align-center>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 md3>
            <v-text-field placeholder="Keywords"></v-text-field>
          </v-flex>
          <v-btn color="secondary">
            Search
          </v-btn>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      matchingGenders: [],
      genders: [
        'Males Only',
        'Females Only',
        'Both'
      ],
      targetLocations: [],
      locations: [
        'Gangnam',
        'Gwanghwamun',
        'Sinchon'
      ]
    }
  }
}
</script>

<style>

</style>
