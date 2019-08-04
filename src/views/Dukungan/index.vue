<template>
	<v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown, 'pa-3': $vuetify.breakpoint.mdAndUp }">
		<v-layout>
			<v-flex md4 :class="{ 'px-3 pt-4': $vuetify.breakpoint.smAndDown }" style="margin-bottom: -10px">
				<v-form @submit.prevent="getSupporters()">
					<v-text-field @click:append="getSupporters()" :loading="loading" v-model="keyword" class="mb-0" solo label="Cari pendukung..." clearable clear-icon="mdi-close" color="teal" autofocus append-icon="mdi-magnify"></v-text-field>
				</v-form>
			</v-flex>
		</v-layout>

		<v-layout>
			<v-flex>
				<v-card v-if="!isEmpty">
					<v-list two-line class="py-0">
						<template v-for="(item, index) in supporters.data">
							<v-list-item :key="item.id" @click="showSupperter(item)">
								<v-list-item-content>
									<v-list-item-title>{{ item.voter.name }} - {{ item.voter.nik }}</v-list-item-title>
									<v-list-item-subtitle>Oleh : {{ item.created_by.name }}</v-list-item-subtitle>
								</v-list-item-content>
								<v-list-item-action top>
									<v-list-item-action-text>
										<v-icon>mdi-dots-horizontal</v-icon>
									</v-list-item-action-text>
									<v-list-item-action-text>{{ item.created_at }}</v-list-item-action-text>
								</v-list-item-action>
							</v-list-item>
							<v-divider v-if="index + 1 < supporters.data.length" :key="`divider-${index}`"></v-divider>
						</template>
					</v-list>
				</v-card>
				<v-card v-else :class="{ 'mx-3 mb-3': $vuetify.breakpoint.smAndDown }">
					<v-card-text class="text-xs-center">
						Data tidak ditemukan.
					</v-card-text>
				</v-card>
				<div class="text-center my-3">
					<v-pagination color="teal" v-model="page"
						:length="supporters.meta.last_page"
						:total-visible="5"
						next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" v-if="Object.keys(supporters).length && !isEmpty">
					</v-pagination>
				</div>
			</v-flex>
		</v-layout>

		<show ref="supporter" />
		<alert ref="alert" />
		<confirm ref="confirm" />
	</v-container>
</template>

<script>
import $axios from "../../api.js"
import Show from "./Show"
import Confirm from "../../components/Confirm"
import Alert from "../../components/Alert"
export default {
	components: { Show, Alert, Confirm },
    data () {
		return {
			loading: true,
			keyword: null,
			supporters: {},
			page: 1
		}
	},
	watch: {
		page(value) {
			this.getSupporters(value)
			window.scrollTo(0, 0);
		},
		keyword(value) {
			if (value == '' || value == null) {
				this.getSupporters()
			} else {
				this.loading = false
			}
		}
	},
	computed: {
		isEmpty() {
			return Object.keys(this.supporters).length && this.supporters.data.length == 0
		}
	},
	methods: {
		getSupporters(page = 1) {
			this.loading = true
			$axios.get('/supporters', {
				params: {
					page: page,
					q: this.keyword
				}
			})
			.then(({ data }) => {
				this.supporters = data
			})
			.catch((error) => {
				let data = error.response.data
				this.$refs.alert.show(data.message, 'error')
			})
			.then(() => {
				this.loading = false
				this.$root.pageLoading = false
			})
		},
		showSupperter(data) {
			this.$refs.supporter.show(data)
		},
		remokeSupporter(id) {
			this.$refs.confirm.open('Hapus pemilih dari daftar pendukung ?', 'Ya! Hapus', 'Batal')
            .then((confirm) => {
                if (confirm) {
					$axios.delete('/supporters/' + id)
					.then(({ data }) => {
						this.$refs.alert.show(data.message, 'success')
						this.getSupporters(this.page)
					})
					.catch((error) => {
						let data = error.response.data
						this.$refs.alert.show(data.message, 'error')
					})
					.then(() => {
						this.$refs.confirm.close()
						this.$refs.supporter.dialog = false
					})
                }
            })
		},
	},
	created() {
		this.$root.pageLoading = true
	},
	mounted() {
		this.getSupporters()
	}
}
</script>