<template>
    <v-app :dark="$root.darkmode" :style="!isAuth ? 'background-color: #009688' : ''">
        <v-progress-linear
            :indeterminate="$root.pageLoading" :height="4" background-opacity="0"
            color="yellow" style="z-index: 9999; position: fixed" class="ma-0">
        </v-progress-linear>
        <navbar v-if="isAuth"/>

        <v-content>
            <router-view />
            <search />
        </v-content>

        <bottom-nav v-if="isAuth" />
    </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Search from './components/Search'
import Navbar from './components/layouts/Navbar'
import BottomNav from './components/layouts/BottomNav'
export default {
    name: 'App',
    computed: {
        ...mapState(['token']),
        ...mapGetters(['isAuth'])
    },
    components: { Navbar, BottomNav, Search },
	data () {
		return {

		}
    }
}
</script>
