<template>
    <div>
        <toolbar></toolbar>
        <v-layout align-center>
            <v-flex id="login-box" xs3>
                <login></login>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Login from '../components/Login.vue'
import Toolbar from '../components/Toolbar.vue'

export default {
    components:{
        Login,
        Toolbar
    }
}
</script>

<style>
    #login-box {
        position: relative;
        top: 100px;
        margin: auto;
    }
</style>
