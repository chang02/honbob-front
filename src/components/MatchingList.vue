<template>
    <div id="matching-list">
        <v-expansion-panel expand focusable>
            <v-expansion-panel-content v-for="request in requests" :key="request">
                <template v-slot:header>
                    <v-layout row>
                        <img :src="request.image">
                        <v-flex>
                            <v-card-title primary-title>
                                <h3>{{request.restaurant}}</h3>
                            </v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="red" v-if="!request.participating" @click="request.participating=true">Participate</v-btn>
                                <v-btn flat color="red" v-else @click="request.participating=false">Cancel</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
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
                    image: require('@/assets/nineounce.jpg')
                },
                {
                    restaurant: 'eggthumb',
                    participating: false,
                    image: require('@/assets/eggthumb.jpg')
                },
                {
                    restaurant: 'tendong',
                    participating: false,
                    image: require('@/assets/tendong.jpg')
                }
            ]
        }
    }
}
</script>

<style scoped>
img {
    width: 100px;
    height: 100px;
}
</style>
