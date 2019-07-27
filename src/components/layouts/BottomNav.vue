<template>
	<v-bottom-navigation value="true" grow color="teal" app>
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
			<v-icon>far fa-user-circle</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {

}
</script>
