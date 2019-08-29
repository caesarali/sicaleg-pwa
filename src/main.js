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

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    deferredPrompt = event;
})

const app = new Vue({
	data: () => ({
		searchDialog: false,
        darkmode: false,
		pageLoading: false,
		onLine: navigator.onLine
	}),
	computed: {
		availableToInstall() {
			return deferredPrompt != undefined ? true : false
		}
	},
	methods: {
		install() {
			deferredPrompt.prompt(); // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((result) => {
                if (result.outcome === 'dismissed') {
                    console.log('Aplikasi batal di-instal.')
                } else {
                    console.log('Aplikasi berhasil di-install.')
                }
                deferredPrompt = null;
            });
		}
	},
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
