<template>
    <v-layout>
        <v-flex xs5 md3 class="py-2">
            {{ field }} <span class="mx-2" style="float: right">:</span>
        </v-flex>
        <v-flex class="py-2">
            {{ value }}
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ['field', 'value']
}
</script>
