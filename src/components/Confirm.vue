<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-text>
                    {{ message }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="fray" text @click="close">
                        {{ cancelButtonText }}
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="teal" text @click="confirm" :loading="loading">
                        {{ confirmButtonText }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            message: '',
            confirmButtonText: '',
            cancelButtonText: '',
            loading: false
        }
    },

    methods: {
        open(message, confirmButtonText, cancelButtonText) {
            this.loading = false
            this.message = message
            this.confirmButtonText = confirmButtonText
            this.cancelButtonText = cancelButtonText
            this.dialog = true
            return new Promise((resolve, reject) => {
                this.resolve = resolve
                this.reject = reject
            })
        },
        close() {
            this.resolve(false)
            this.dialog = false
        },
        confirm() {
            this.resolve(true)
            this.loading = true
        }
    }
}
</script>
