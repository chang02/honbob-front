<template>
    <div id="matching-list">
        <v-expansion-panel expand focusable>
            <v-expansion-panel-content v-for="request in requests" :key="request">
                <template v-slot:header>
                    <div>
                        <!-- <img :src="request.image"> -->
                        <v-card-title primary-title>
                            <h3>{{request.restaurant}}</h3>
                        </v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="red" v-if="!request.participating" @click="request.participating=true">Participate</v-btn>
                            <v-btn flat color="red" v-else @click="request.participating=false">Cancel</v-btn>
                        </v-card-actions>
                    </div>
                </template>
                <v-card>
                    <v-card-text>
                        this is contents
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            requests: [
                {
                    restaurant: 'Nine Ounce',
                    participating: false,
                    image: '../assets/nineounce.jpg'
                },
                {
                    restaurant: 'eggthumb',
                    participating: false,
                    image: '../assets/eggthumb.jpg'
                },
                {
                    restaurant: 'tendong',
                    participating: false,
                    image: '../assets/tendong.jpg'
                }
            ]
        }
    }
}
</script>

<style>

</style>
