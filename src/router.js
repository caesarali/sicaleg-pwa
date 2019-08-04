import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Auth/Login'
import Home from './views/Home'
import Dukungan from './views/Dukungan'
import Caleg from './views/Caleg'
import Profile from './views/Profile'

import store from './stores'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
        { path: '/login', name: 'login', component: Login },

        { path: '/', name: 'home', component: Home, meta: { requiresAuth: true }},
        { path: '/dukungan', name: 'dukungan', component: Dukungan, meta: { requiresAuth: true } },
        { path: '/caleg', name: 'caleg', component: Caleg, meta: { requiresAuth: true } },
        { path: '/setting', name: 'setting', component: Profile, meta: { requiresAuth: true } },
	]
})

//Navigation Guards
router.beforeEach((to, from, next) => {
    store.commit('CLEAR_ERRORS')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let auth = store.getters.isAuth
        if (!auth) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
