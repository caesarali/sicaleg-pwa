import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth
	},
	state: {
		token: localStorage.getItem('token'),
		errors: [],
		loading: false
	},
	getters: {
		isAuth: state => {
            return state.token != "null" && state.token != null
		},
		isLoading: state => {
			return state.loading
		}
	},
	mutations: {
		//SEBUAH MUTATIONS YANG BERFUNGSI UNTUK MEMANIPULASI VALUE DARI STATE token
        SET_TOKEN(state, payload) {
            state.token = payload
		},
		SET_LOADING(state, payload) {
            state.loading = payload
		},
        SET_ERRORS(state, payload) {
            state.errors = payload
        },
        CLEAR_ERRORS(state) {
            state.errors = []
        }
	},
	actions: {
		// code here...
	}
})
