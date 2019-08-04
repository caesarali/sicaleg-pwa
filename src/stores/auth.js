import $axios from "../api.js"

const state = () => ({

})

const mutations = {

}

const actions = {
    submit({ commit }, payload) {
        localStorage.setItem('token', null)
        commit('SET_TOKEN', null, { root: true })

        return new Promise((resolve, reject) => {
            commit('SET_LOADING', true, { root: true })
            $axios.post('/login', payload)
            .then((response) => {
                if (response.data.status == 'success') {
                    localStorage.setItem('token', response.data.data)
                    $axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data
                    commit('SET_TOKEN', response.data.data, { root: true })
                } else {
                    commit('SET_ERRORS', { invalid: 'Email/Password Salah' }, { root: true })
                }
                resolve(response.data)
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    commit('SET_ERRORS', error.response.data.errors, { root: true })
                }
            })
            .then(() => {
                commit('SET_LOADING', false, { root: true })
            })
        })
    },

    logout({ commit }) {
        localStorage.setItem('token', null) //RESET LOCAL STORAGE MENJADI NULL
        commit('SET_TOKEN', null, { root: true }) //RESET STATE TOKEN MENJADI NULL
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}