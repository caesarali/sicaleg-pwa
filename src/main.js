import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify';
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

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

const app = new Vue({
	data: () => ({
		searchDialog: false,
        darkmode: false,
		pageLoading: false,
		onLine: navigator.onLine
    }),
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')

console.log('Networ online: ' + navigator.onLine)

function updateConnectionStatus() {
	app.onLine = navigator.onLine // this method
}

window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
