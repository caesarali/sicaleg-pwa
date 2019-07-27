<template>
    <v-container fluid fill-height>
        <v-layout justify-center style="margin-top: 100px">
            <v-flex xs12 sm6 md3>
                <div class="text-center pa-5">
                    <v-avatar size="70" tile class="mr-3">
                        <v-img :src="require('../../assets/vote.png')"></v-img>
                    </v-avatar>
                </div>
                <v-card>
                    <v-card-title class="d-block text-center">
                        <h6 class="title">SIMCALEG</h6>
                        <small class="mb-3 caption">PORTAL RELAWAN</small>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="postLogin">
                            <v-text-field color="teal" :error="errors.email && errors.email.length > 0" :error-messages="errors.email" v-model="data.email" prepend-inner-icon="person" name="email" label="Email" clear-icon="clear" type="text" clearable></v-text-field>
                            <v-text-field color="teal" :error="errors.password && errors.password.length > 0" :error-messages="errors.password" v-model="data.password" prepend-inner-icon="lock" name="password" label="Password" id="password" type="password" clear-icon="clear" clearable></v-text-field>
                            <div class="text-center">
                                <v-btn color="teal" dark type="submit" block :loading="isLoading">
                                    <v-icon left>mdi-login</v-icon>
                                    Login
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar v-model="errors.invalid" top color="error" multi-line>
            Login Gagal !!
            <v-btn dark text @click="CLEAR_ERRORS()">
                <v-icon>clear</v-icon>
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            loading: false,
            data: {
                email: '',
                password: '',
                remember_me: false,
            }
        }
    },
    created() {
        if (this.isAuth) {
            this.$router.push({ name: 'home' })
        }
    },
    computed: {
        ...mapGetters(['isAuth', 'isLoading']),
      	...mapState(['errors'])
    },
    methods: {
        ...mapActions('auth', ['submit']),
        ...mapMutations(['CLEAR_ERRORS']),

        async postLogin() {
            this.loading = true
            await this.submit(this.data).then(() => {
                if (this.isAuth) {
                    this.CLEAR_ERRORS()
                    this.$router.push({ name: 'home' })
                }
            })
        }
    }
}
</script>
