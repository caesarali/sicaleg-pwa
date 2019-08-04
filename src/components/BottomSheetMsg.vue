<template>
    <v-bottom-sheet v-model="sheet">
        <v-sheet class="pa-3">
            <p class="subtitle-1 text-center">{{ text }}</p>
            <div class="text-right">
                <v-btn color="teal" text dark @click="sheet = false">OK, mengerti!</v-btn>
            </div>
        </v-sheet>
    </v-bottom-sheet>
</template>

<script>
export default {
    data() {
        return {
            sheet: false,
            text: ''
        }
    },
    methods: {
        show(msg = 'Permintaan sedang diproses.') {
            this.text = msg
            this.sheet = true
        }
    }
}
</script>

