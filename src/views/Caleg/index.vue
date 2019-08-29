<template>
	<v-container>
		<v-layout justify-center>
			<v-flex xs12 md8>
				<v-card>
					<v-card-title primary-title class="justify-center">
						<v-avatar size="100">
							<v-img :src="require('../../assets/man.png')"></v-img>
						</v-avatar>
					</v-card-title>
					<v-card-text class="text-center pt-1" v-if="hasCaleg">
						<h2 class="mb-1">{{ caleg.name }}</h2>
						<p class="text-uppercase mb-0">CALEG {{ caleg.level }} - No. Urut {{ caleg.number }}</p>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout justify-center>
			<v-flex xs12 md8>
				<v-card class="mt-3">
					<v-tabs v-model="active" background-color="teal" grow dark slider-color="white">
						<v-tab ripple>DAPIL</v-tab>
						<v-tab ripple>PARTAI</v-tab>
					</v-tabs>
					<v-tabs-items v-model="active">
						<v-tab-item>
							<v-card flat>
								<v-card-title class="pt-2">
									<h6 class="subtitle">{{ caleg.dapil }}</h6>
								</v-card-title>
								<v-card-text>
									<p v-for="(item, index) in dapil" :key="index" class="mb-1">
										<span class="mr-2">{{ index+1 }}.</span>
										<span>{{ item }}</span>
									</p>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-card flat>
								<v-card-text class="text-center">
									<h2 class="mb-1">{{ partai.name }}</h2>
									<p class="text-uppercase mb-0">{{ partai.fullname }}</p>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import $axios from "../../api.js"
export default {
	data() {
		return {
			caleg: [],
			dapil: [],
			partai: [],
			active: null,
		}
	},
	watch: {
		'$root.onLine'(value) {
			if (value) {
				this.getCaleg()
			}
		},
	},
	computed: {
		hasCaleg() {
			return Object.keys(this.caleg).length || this.caleg.length ? true : false
		}
	},
	methods: {
		getCaleg() {
			$axios.get('/candidate')
			.then(({ data }) => {
				this.caleg = data.caleg
				this.dapil = data.dapil
				this.partai = data.partai
			})
			.catch((error) => {
				let data = error.response.data
				this.$refs.alert.show(data.message, 'error')
			})
			.then(() => this.$root.pageLoading = false)
		}
	},
	created() {
		this.$root.pageLoading = true
	},
	mounted() {
		this.getCaleg()
	}
}
</script>
