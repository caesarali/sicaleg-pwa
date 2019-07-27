import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.filter('gender', function (value) {
	return value == 'p' ? 'Perempuan' : 'Laki-laki'
})
Vue.filter('marital', function (value) {
	switch (value) {
		case 's':
			return 'Sudah Menikah';
		case 'p':
			return 'Pernah Menikah';
		default:
			return 'Belum Menikah';
	}
})

new Vue({
	data: () => ({
		searchDialog: false,
        darkmode: false,
        pageLoading: false
    }),
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
