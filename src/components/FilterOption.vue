<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <v-layout row wrap align-center>
          <v-flex xs1>
            <v-subheader v-text="'Gender'"></v-subheader>
          </v-flex>
          <v-flex xs5>
            <v-select v-model="matchingGenders" :items="genders" label="Select" multiple>
            </v-select>
          </v-flex>
          <v-flex xs1>
            <v-subheader v-text="'Location'"></v-subheader>
          </v-flex>
          <v-flex xs5>
            <v-select v-model="targetLocations" :items="locations" label="Select" multiple>
            </v-select>
          </v-flex>
          <v-flex xs5>
            <v-text-field placeholder="Keywords"></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn flat>
              Search
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
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
