<template>
    <div id="matching-list">
        <v-layout>
            <v-flex xs6>
                <v-card v-for="request in requests" :key="request">
                    <v-img :src= "request.image" height="300px">
                    </v-img>
                    <v-card-title primary-title>
                        <div>
                        <div class="headline">{{request.restaurant}}</div>
                        <span class="grey--text">1,000 miles of wonder</span>
                        </div>
                    </v-card-title>
            
                    <v-card-actions>
                        <v-btn flat color="blue" v-if="!request.participating" @click="request.participating=true">Participate</v-btn>
                        <v-btn flat color="red" v-else @click="request.participating=false">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="request.show = !request.show">
                            <v-icon>{{ request.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-slide-y-transition>
                        <v-card-text v-show="request.show">
                            Introduction
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>
            </v-flex>
        </v-layout>
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
                    image: require('@/assets/nineounce.jpg'),
                    show: true
                },
                {
                    restaurant: 'eggthumb',
                    participating: false,
                    image: require('@/assets/eggthumb.jpg'),
                    show: false
                },
                {
                    restaurant: 'tendong',
                    participating: false,
                    image: require('@/assets/tendong.jpg'),
                    show: false
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
