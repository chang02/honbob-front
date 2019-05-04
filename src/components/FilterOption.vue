<template>
    <div id="filter-option">
        <v-container fluid>
            <v-layout column>
                <v-layout row wrap align-center v-for="i in 2" :key="i">
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
                </v-layout>
                <v-layout row wrap align-center>
                    <v-flex>
                        <v-text-field label="Search" placeholder="Keywords"></v-text-field>
                    </v-flex>
                    <v-btn flat>
                        Search
                    </v-btn>
                    <v-flex>
                        <v-text-field label="Search" placeholder="Keywords"></v-text-field>
                    </v-flex>
                    <v-btn flat>
                        Search
                    </v-btn>
                </v-layout>  
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
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
