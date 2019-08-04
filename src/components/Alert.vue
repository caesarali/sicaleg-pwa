<template>
    <v-snackbar v-model="snackbar" top :color="type" multi-line>
        {{ message }}
        <v-btn dark text @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            snackbar: false,
            message: '',
            type: ''
        }
    },

    methods: {
        show(msg = 'Hello, I\'m a snackbar', type = 'error') {
            this.message = msg
            this.type = type
            this.snackbar = true
        }
    }
}
</script>
