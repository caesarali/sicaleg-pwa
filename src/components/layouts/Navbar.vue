<template>
    <v-app-bar app color="teal" dark>
        <v-avatar size="40" tile class="mr-3">
            <v-img :src="require('../../assets/vote.png')"></v-img>
        </v-avatar>

        <v-toolbar-title class="headline text-uppercase">
            <span>SIM</span>
            <span class="font-weight-light">CALEG</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="$root.searchDialog = true">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu transition="scale-transition" origin="top right" :close-on-content-click="false" :nudge-width="190">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </template>
            <v-list dense>
                <v-list-item>
                    <v-list-item-avatar class="mr-2 my-0">
                        <v-icon>mdi-brightness-4</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Dark Mode</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-spacer></v-spacer>
                        <v-switch v-model="$root.darkmode" color="teal"></v-switch>
                    </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>
                <v-list-item @click="postLogout">
                    <v-list-item-avatar class="mr-2 my-0">
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
    methods: {
        ...mapActions('auth', ['logout']),
        postLogout() {
            //DIMANA TOMBOL INI AKAN MENJALANKAN FUNGSI submit() DENGAN MENGIRIMKAN DATA YANG DIBUTUHKAN
            this.logout()
            this.$router.push({ name: 'login' })
        }
    }
}
</script>
