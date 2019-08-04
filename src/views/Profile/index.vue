<template>
	<v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown, 'pa-3': $vuetify.breakpoint.mdAndUp }">
		<v-layout justify-center>
			<v-flex xs12 md6>
				<v-card :flat="$vuetify.breakpoint.smAndDown">
					<v-list two-line>
						<v-list-item>
							<v-list-item-avatar>
								<v-avatar color="teal">
									<v-icon dark>mdi-account-tie</v-icon>
								</v-avatar>
							</v-list-item-avatar>
							<v-list-item-content v-if="profile">
								<v-list-item-title>{{ profile.name }}</v-list-item-title>
								<v-list-item-subtitle>{{ profile.level }}</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action v-if="profile">
								<v-btn icon @click="editmode ? editmode = false : editmode = true">
									<v-icon color="grey">mdi-pencil-outline</v-icon>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>Kontribusi</v-list-item-title>
								<v-progress-linear v-model="data.contribution" color="blue-grey" class="mt-1 mb-2" height="25" reactive>
									<template v-slot="{ value }">
										<strong>{{ Math.ceil(value) }}%</strong>
									</template>
								</v-progress-linear>
								<v-list-item-subtitle class="text-center">
									{{ data.information }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</v-list>

					<v-divider></v-divider>
					<div class="text-center py-5" v-if="!profile">
						<v-progress-circular color="grey lighten-1" indeterminate></v-progress-circular>
					</div>
					<v-form lazy-validation ref="form" v-else @submit.prevent="update">
						<v-list subheader>
							<v-subheader>Akun</v-subheader>
							<v-list-item>
								<v-text-field v-model="form.name" type="text" label="Nama" color="teal" required :disabled="!editmode"></v-text-field>
							</v-list-item>
							<v-list-item>
								<v-text-field v-model="form.email" type="email" label="Email" color="teal" required :disabled="!editmode"></v-text-field>
							</v-list-item>
							<v-list-item>
								<v-text-field v-model="form.password" type="password" label="Password" color="teal" :disabled="!editmode"></v-text-field>
							</v-list-item>
							<div v-if="editmode" class="text-center">
								<v-btn :loading="loading" color="teal" dark type="submit">
									<v-icon left>mdi-check</v-icon> Simpan
								</v-btn>
								<v-btn class="ml-2" color="grey lighten-1" @click="editmode = false">
									Batal
								</v-btn>
							</div>
						</v-list>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>

		<alert ref="alert" />
	</v-container>
</template>

<script>
import $axios from '../../api'
import Alert from "../../components/Alert"
export default {
	components: { Alert },
	data() {
		return {
			editmode: false,
			loading: false,
			data: {
				contribution: '',
				information: '',
				profile: {}
			},
			form: {
				name: '',
				email: '',
				password: ''
			}
		}
	},
	computed: {
		profile() {
			let profile = this.data.profile
			if (Object.keys(profile).length > 0) {
				return {
					name: profile.name,
					level: profile.user.roles[0].display_name,
					phone: profile.phone,
					email: profile.user.email,
					username: profile.user.username
				}
			} else {
				return null
			}
		}
	},
	methods: {
		getProfile() {
			$axios.get('/profile')
			.then(({ data }) => {
				this.data = data
				this.form.name = data.profile.user.name
				this.form.email = data.profile.user.email
			})
			.catch((error) => {
				let data = error.response.data
				this.$refs.alert.show(data.message, 'error')
			})
			.then(() => this.$root.pageLoading = false)
		},
		update() {
			this.loading = true
			$axios.post('/profile', this.form)
			.then(({ data }) => {
				this.data.profile = data.data
				this.$refs.alert.show(data.message, 'success')
			})
			.catch((error) => {
				let data = error.response.data
				this.$refs.alert.show(data.message, 'error')
			})
			.then(() => {
				this.editmode = false
				this.loading = false
			})

			if (!navigator.onLine) {
				this.data.profile.name = this.form.name
				this.editmode = false
				this.loading = false
			}
		}
	},
	created() {
		this.$root.pageLoading = true
	},
	mounted() {
		this.getProfile()
	}
}
</script>
