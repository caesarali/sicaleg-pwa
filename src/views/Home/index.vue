<template>
	<v-container class="fill-height">
		<v-layout wrap align-start justify-center>
			<v-flex xs12 md4 class="mt-1">
				<v-card>
					<v-card-title class="pa-2">
						<v-avatar color="teal" class="elevation-2" tile size="80" style="border-radius: 5px">
							<v-icon dark large>fas fa-thumbs-up</v-icon>
						</v-avatar>
						<div style="height: 80px" class="px-2">
							<h6 class="font-weight-light subtitle-2"><b>TOTAL DUKUNGAN</b></h6>
							<h6 class="font-weight-light subtitle-1">{{ supporters }}</h6>
							<v-divider></v-divider>
							<h6 class="font-weight-light subtitle-1"><b>Target:</b> {{ target.total }} ({{ target.percent }}%)</h6>
						</div>
					</v-card-title>
				</v-card>
			</v-flex>

			<v-flex xs12 class="my-4">
				<v-img :src="require('../../assets/status_update_jjgk.svg')" :lazy-src="require('../../assets/status_update_jjgk.svg')" contain max-height="250">
				</v-img>
			</v-flex>

			<v-flex xs12 class="text-center mt-4">
                <h1 class="font-weight-light mb-3">Hi, Team!</h1>
				<v-btn color="teal" large dark @click="$root.searchDialog = true">
					<v-icon dark left>mdi-plus</v-icon> Dukungan
				</v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import $axios from "../../api";
export default {
	data() {
		return {
			supporters: 0,
			target: {
				percent: 0,
				total: 0
			}
		}
	},

	methods: {
		getDashboardData() {
			$axios.get('/dashboard')
			.then(({ data }) => {
				this.supporters = data.supporters
				this.target = data.target
			})
			.catch()
			.then(() => this.$root.pageLoading = false)
		}
	},

	mounted() {
		this.getDashboardData()
	}
}
</script>
