<template>
	<v-bottom-navigation value="true" grow color="teal" app :style="offline">
		<v-btn :to="{ name: 'home' }" exact>
			<span>Home</span>
			<v-icon>mdi-home-outline</v-icon>
		</v-btn>

		<v-btn :to="{ name: 'dukungan' }" exact>
			<span>Dukungan</span>
			<v-icon>mdi-filter-outline</v-icon>
		</v-btn>

		<v-btn :to="{ name: 'caleg' }" exact>
			<span>Caleg</span>
			<v-icon>mdi-account-circle-outline</v-icon>
		</v-btn>

		<v-btn :to="{ name: 'setting' }" exact>
			<span>Setting</span>
			<v-icon>mdi-settings-outline</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {
	computed: {
		offline() {
			return this.$root.onLine ? '' : 'bottom: 24px'
		}
	}
}
</script>
